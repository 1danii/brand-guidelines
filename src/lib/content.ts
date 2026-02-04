import { join } from "node:path";
import slugify from "@sindresorhus/slugify";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import { Glob } from "bun";
import type { MDXComponents } from "mdx/types";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { rehypeSections } from "./rehype-sections";

const CONTENT_DIR = join(process.cwd(), "content");
const MDX_EXTENSION = ".mdx";
const FRONTMATTER_REGEX = /^---\s*\n[\s\S]*?\n---\s*\n/;

export interface PageFrontmatter {
  title: string;
  description: string;
}

export interface Heading {
  value: string;
  id?: string;
  depth?: number;
}

export interface PageData {
  slug: string[];
  title: string;
  filePath: string;
  headings: Heading[];
}

/**
 * Strip frontmatter from MDX source
 */
function stripFrontmatter(source: string): string {
  // Remove frontmatter (content between --- markers at the start)
  return source.replace(FRONTMATTER_REGEX, "");
}

/**
 * Extract headings from MDX source using rehype-extract-toc
 */
async function extractHeadings(source: string): Promise<Heading[]> {
  // Strip frontmatter before processing
  const contentWithoutFrontmatter = stripFrontmatter(source);

  // Create a VFile-like object with the source
  const file = {
    value: contentWithoutFrontmatter,
    path: "temp.mdx",
    data: {},
  };

  // We need to compile the MDX to trigger the rehype plugins
  // The TOC will be extracted and we can read it from the file data
  const { compile } = await import("@mdx-js/mdx");

  await compile(file, {
    outputFormat: "function-body",
    rehypePlugins: [rehypeExtractToc],
  });

  // The TOC data is attached to the file object
  // @ts-expect-error - TOC is added by rehype-extract-toc
  const toc: Array<{ value: string; depth?: number }> = file.data?.toc || [];

  // Generate slugs for each heading using slugify
  return toc.map((heading) => ({
    value: heading.value,
    depth: heading.depth,
    id: slugify(heading.value),
  }));
}

/**
 * Get all MDX files from content directory (one level deep only)
 */
export async function getAllPages(): Promise<PageData[]> {
  const pages: PageData[] = [];
  const glob = new Glob(`*${MDX_EXTENSION}`);

  for await (const filePath of glob.scan(CONTENT_DIR)) {
    const filename = filePath.slice(0, -MDX_EXTENSION.length);
    const fullPath = join(CONTENT_DIR, filePath);
    const bunFile = Bun.file(fullPath);
    const source = await bunFile.text();

    // Parse frontmatter manually
    const { compileMDX: compileMDXForFrontmatter } = await import(
      "next-mdx-remote/rsc"
    );
    const { frontmatter } = await compileMDXForFrontmatter<PageFrontmatter>({
      source,
      options: { parseFrontmatter: true },
    });

    const title = frontmatter.title || filename;

    // Handle index.mdx as root path
    const slug = filename === "index" ? [] : [filename];

    // Extract headings
    const headings = await extractHeadings(source);

    pages.push({
      slug,
      title,
      filePath: fullPath,
      headings,
    });
  }

  return pages;
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(
  slug: string[],
  components?: MDXComponents
) {
  const slugPath = slug.length === 0 ? "index" : join(...slug);
  const filePath = join(CONTENT_DIR, `${slugPath}.mdx`);
  const bunFile = Bun.file(filePath);

  // Check if file exists using Bun's API
  const exists = await bunFile.exists();
  if (!exists) {
    return null;
  }

  const source = await bunFile.text();

  // First, parse frontmatter to get the data for the sections plugin
  const { frontmatter } = await compileMDX<PageFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  // Now compile with the sections plugin using the parsed frontmatter
  const { content } = await compileMDX<PageFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeExtractToc,
          rehypeUnwrapImages,
          [rehypeSections, { frontmatter }],
        ],
      },
    },
    components,
  });

  return {
    content,
    frontmatter,
    slug,
  };
}

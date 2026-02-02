import { join } from "node:path";
import { Glob } from "bun";
import type { MDXComponents } from "mdx/types";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeUnwrapImages from "rehype-unwrap-images";

const CONTENT_DIR = join(process.cwd(), "content");
const MDX_EXTENSION = ".mdx";

export interface PageFrontmatter {
  title: string;
}

export interface PageData {
  slug: string[];
  title: string;
  filePath: string;
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

    // Use next-mdx-remote's built-in frontmatter parsing
    const { frontmatter } = await compileMDX<PageFrontmatter>({
      source,
      options: { parseFrontmatter: true },
    });

    const title = frontmatter.title || filename;

    // Handle index.mdx as root path
    const slug = filename === "index" ? [] : [filename];

    pages.push({
      slug,
      title,
      filePath: fullPath,
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

  // Use next-mdx-remote's built-in frontmatter parsing
  const { content, frontmatter } = await compileMDX<PageFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeUnwrapImages],
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

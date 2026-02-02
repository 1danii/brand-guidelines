import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import type { ImageProps } from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { Asset } from "@/components/blocks/asset";
import { Color } from "@/components/blocks/color";
import { Columns } from "@/components/blocks/columns";
import { Heading1, Heading2 } from "@/components/blocks/heading";
import { Image } from "@/components/blocks/image";
import { Paragraph } from "@/components/blocks/paragraph";
import { Section } from "@/components/blocks/section";

interface Frontmatter {
  title: string;
}

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <Heading1>{children}</Heading1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <Heading2>{children}</Heading2>
  ),
  img: (props: ImageProps) => (
    <Image sizes="100vw" style={{ width: "100%", height: "auto" }} {...props} />
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <Paragraph>{children}</Paragraph>
  ),
  Asset,
  Color,
  Columns,
  Section,
};

export async function generateMetadata(): Promise<Metadata> {
  const filePath = join(process.cwd(), "content", "page.mdx");
  const source = readFileSync(filePath, "utf8");

  const { frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeUnwrapImages],
      },
    },
  });

  return {
    title: frontmatter.title,
  };
}

export default async function Page() {
  const filePath = join(process.cwd(), "content", "page.mdx");
  const source = readFileSync(filePath, "utf8");

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeUnwrapImages],
      },
    },
    components,
  });

  return (
    <>
      <h1 className="sr-only">{frontmatter.title}</h1>
      {content}
    </>
  );
}

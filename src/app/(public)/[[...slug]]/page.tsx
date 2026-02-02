import type { Metadata } from "next";
import type { ImageProps } from "next/image";
import { notFound } from "next/navigation";
import { Asset } from "@/components/blocks/asset";
import { Color } from "@/components/blocks/color";
import { Columns } from "@/components/blocks/columns";
import { Heading1, Heading2 } from "@/components/blocks/heading";
import { Image } from "@/components/blocks/image";
import { Paragraph } from "@/components/blocks/paragraph";
import { Section } from "@/components/blocks/section";
import { getAllPages, getPageBySlug } from "@/lib/content";

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

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page) => ({
    slug: page.slug.length === 0 ? [] : page.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageSlug = slug ?? [];
  const page = await getPageBySlug(pageSlug);

  if (!page) {
    notFound();
  }

  return {
    title: page.frontmatter.title,
    description: page.frontmatter.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pageSlug = slug ?? [];
  const page = await getPageBySlug(pageSlug, components);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Section>
        <Columns>
          <Heading1>{page.frontmatter.title}</Heading1>
          <Paragraph>{page.frontmatter.description}</Paragraph>
        </Columns>
      </Section>
      {page.content}
    </>
  );
}

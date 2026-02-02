import type { MDXComponents } from "mdx/types";
import type { ImageProps } from "next/image";
import { Heading1, Heading2 } from "@/components/blocks/heading";
import { Image } from "@/components/blocks/image";
import { Paragraph } from "./components/blocks/paragraph";

const components = {
  h1: ({ children }) => <Heading1>{children}</Heading1>,
  h2: ({ children }) => <Heading2>{children}</Heading2>,
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
  p: ({ children }) => <Paragraph>{children}</Paragraph>,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}

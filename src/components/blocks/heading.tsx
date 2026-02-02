import type { ComponentProps, ReactNode } from "react";
import slugify from "slugify";

function getHeadingId(children: ReactNode): string | undefined {
  if (typeof children === "string") {
    return slugify(children, { lower: true, strict: true });
  }
  return undefined;
}

export function Heading1(props: ComponentProps<"h1">) {
  const id = getHeadingId(props.children);
  return (
    <h1
      className="text-pretty font-headline text-6xl text-brand"
      {...props}
      id={id}
    />
  );
}

export function Heading2(props: ComponentProps<"h2">) {
  const id = getHeadingId(props.children);
  return (
    <h2
      className="text-pretty font-headline text-5xl text-brand"
      {...props}
      id={id}
    />
  );
}

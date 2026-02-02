import type { ComponentProps } from "react";

export function Heading1(props: ComponentProps<"h2">) {
  return <h1 className="font-headline text-6xl text-brand" {...props} />;
}

export function Heading2(props: ComponentProps<"h2">) {
  return <h2 className="font-headline text-5xl text-brand" {...props} />;
}

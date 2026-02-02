import type { ComponentProps } from "react";

export function Paragraph(props: ComponentProps<"p">) {
  return (
    <p className="text-pretty text-left text-base text-brand" {...props} />
  );
}

import type { ComponentProps } from "react";

export function Columns(props: ComponentProps<"div">) {
  return <div {...props} className="grid grid-cols-2 gap-10" />;
}

import type { ComponentProps } from "react";

export function Grid(props: ComponentProps<"div">) {
  return <div {...props} className="grid grid-cols-2 gap-10" />;
}

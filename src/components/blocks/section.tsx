import type { ComponentProps } from "react";

export function Section(props: ComponentProps<"div">) {
  return (
    <div
      className="flex flex-col gap-y-10 border-b pt-10 pb-24 pl-10"
      {...props}
    />
  );
}

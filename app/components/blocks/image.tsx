import NextImage from "next/image";
import type { ComponentProps } from "react";

export function Image(
  props: Pick<ComponentProps<typeof NextImage>, "src" | "alt">
) {
  return (
    <NextImage
      {...props}
      className="size-full rounded-2xl bg-secondary"
      height={1000}
      width={1000}
    />
  );
}

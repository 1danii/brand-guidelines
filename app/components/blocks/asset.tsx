import NextImage from "next/image";
import type { ComponentProps } from "react";

export function Asset(
  props: Pick<ComponentProps<typeof NextImage>, "src" | "alt">
) {
  return (
    <div className="relative flex aspect-3/4 size-full items-center justify-center rounded-2xl bg-secondary px-10">
      <NextImage
        {...props}
        className="max-w-32 object-contain object-center"
        height={1000}
        width={1000}
      />
      <figcaption className="absolute bottom-8 left-8 text-left text-base text-brand">
        {props.alt}
      </figcaption>
    </div>
  );
}

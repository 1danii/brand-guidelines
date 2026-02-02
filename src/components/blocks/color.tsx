import { type Color as CuloriColor, parse, wcagContrast } from "culori";

export function Color(props: { hex: string }) {
  const color = parse(props.hex) as CuloriColor;
  // const oklchColor = oklch(color)!;

  const isLight = wcagContrast(color, "#000") < wcagContrast(color, "#fff");

  return (
    <div
      className="relative aspect-3/4 size-full rounded-2xl border"
      style={{ backgroundColor: props.hex }}
    >
      <figcaption
        className="absolute bottom-8 left-8 text-left text-base text-black data-[light=true]:text-white"
        data-light={isLight}
      >
        Color:
        <br />
        {props.hex}
      </figcaption>
    </div>
  );
}

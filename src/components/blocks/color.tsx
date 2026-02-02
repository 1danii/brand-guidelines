export function Color(props: { hex: string }) {
  return (
    <div
      className="relative aspect-3/4 size-full rounded-2xl border"
      style={{ backgroundColor: props.hex }}
    >
      <figcaption className="absolute bottom-8 left-8 text-left text-base text-white">
        Color:
        <br />
        {props.hex}
      </figcaption>
    </div>
  );
}

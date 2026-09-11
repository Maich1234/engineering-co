import Image from "next/image";
import { img, type ImageKey } from "@/content/images";
import { Reveal } from "./reveal";

type PlateProps = {
  image: ImageKey;
  /** Overrides the manifest alt where the surrounding copy needs it. */
  alt?: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Defaults to the file's own ratio. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Scale slightly on hover — for cards inside a link. */
  zoom?: boolean;
  /** Skip the uncover animation (hero images, above the fold). */
  still?: boolean;
  /** Plate number printed in the corner, drawing-sheet style. */
  plateNo?: string;
  caption?: string;
  quality?: number;
};

/**
 * Every photograph on the site goes through here, so the loading colour,
 * blur-up, aspect ratio and reveal behave identically everywhere.
 */
export function Plate({
  image,
  alt,
  ratio,
  sizes = "(max-width: 860px) 100vw, 50vw",
  priority = false,
  className = "",
  zoom = false,
  still = false,
  plateNo,
  caption,
  quality = 78,
}: PlateProps) {
  const src = img(image);
  const aspect = ratio ?? `${src.ratio} / 1`;

  const inner = (
    <div
      className={`plate ${zoom ? "plate--zoom" : ""} ${className}`}
      style={{ aspectRatio: aspect, backgroundColor: src.color }}
    >
      <Image
        src={src.src}
        alt={alt ?? src.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL={src.blurDataURL}
      />
      {plateNo ? (
        <span className="t-label-sm absolute left-3 top-3 z-10 bg-graphite-950/72 px-2 py-1 text-on-dark-2 backdrop-blur-[2px]">
          {plateNo}
        </span>
      ) : null}
    </div>
  );

  const body = still ? (
    inner
  ) : (
    <Reveal kind="plate">
      <div className="plate-mask">{inner}</div>
    </Reveal>
  );

  if (!caption) return body;

  return (
    <figure className="m-0">
      {body}
      <figcaption className="t-label-sm mt-3 flex items-start gap-2 opacity-55">
        <span aria-hidden className="mt-[3px] inline-block h-px w-4 bg-current" />
        <span className="tracking-[0.14em]">{caption}</span>
      </figcaption>
    </figure>
  );
}

/**
 * A full-bleed cover image for a section background. Separate from Plate
 * because it fills its parent rather than holding an aspect ratio.
 */
export function Backdrop({
  image,
  priority = false,
  sizes = "100vw",
  className = "",
  quality = 80,
}: {
  image: ImageKey;
  priority?: boolean;
  sizes?: string;
  className?: string;
  quality?: number;
}) {
  const src = img(image);
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ backgroundColor: src.color }}
    >
      <Image
        src={src.src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL={src.blurDataURL}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

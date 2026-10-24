import Image from "next/image";
import type { Shot } from "@/content/site";
import { Scene } from "./Scenes";

// Fixed frame for a photo. The inner layer zooms on hover and is the target
// for scroll reveals (scale/clip). Without a src it shows a drawn stand-in.
export function Frame({
  shot,
  className = "",
  sizes = "50vw",
  zoom = true,
}: {
  shot: Shot;
  className?: string;
  sizes?: string;
  zoom?: boolean;
}) {
  return (
    <figure
      className={`frame group relative overflow-hidden bg-ground-3 ${className}`}
      data-cursor={zoom ? "View" : undefined}
    >
      <div
        className={`frame-inner absolute inset-0 will-change-transform ${zoom ? "transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.06]" : ""}`}
      >
        {shot.src ? (
          <Image src={shot.src} alt={shot.alt} fill sizes={sizes} className="object-cover" />
        ) : (
          <div role="img" aria-label={shot.alt} className="absolute inset-0">
            <Scene scene={shot.scene} />
          </div>
        )}
      </div>
      {!shot.src && (
        <figcaption className="label absolute bottom-0 left-0 bg-ground-3/90 px-2.5 py-1.5 text-[0.58rem] text-mist">
          Photo · {shot.note}
        </figcaption>
      )}
    </figure>
  );
}

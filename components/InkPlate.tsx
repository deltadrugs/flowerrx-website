"use client";

import { StorefrontDrawing } from "@/components/engravings";
import { Photo } from "@/components/Photo";
import { photos } from "@/lib/photos";
import { useEffect, useRef } from "react";

/**
 * Scroll advances --p from 0 to 1. The drawing strokes use it to ink in,
 * then the duotone photograph fades over them. Reduced motion, and browsers
 * without scroll-driven animations, are handled in CSS plus this fallback.
 */
export function InkPlate() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timeline = CSS.supports("animation-timeline: view()");

    const apply = () => {
      if (reduce.matches || timeline) {
        scene.style.removeProperty("--p");
        return;
      }
      const rect = scene.getBoundingClientRect();
      const view = window.innerHeight;
      const start = view * 0.86;
      const finish = view * 0.34 - scene.offsetHeight;
      const span = start - finish;
      const next = span > 0 ? (start - rect.top) / span : 1;
      const clamped = Math.min(1, Math.max(0, next));
      scene.style.setProperty("--p", clamped.toFixed(4));
    };

    if (reduce.matches || timeline) {
      apply();
      const onChange = () => apply();
      reduce.addEventListener("change", onChange);
      return () => reduce.removeEventListener("change", onChange);
    }

    scene.classList.add("is-scripted");

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        apply();
      });
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ink-scene" ref={sceneRef}>
      <div className="ink-sticky">
        <figure className="plate-figure">
          <div className="plate">
            <div className="plate-photo">
              <Photo
                photo={photos.heroStorefrontWide}
                priority
                alt="Flower Rx Pharmacy storefront: red brick, steel-frame glass doors, and the carved oval sign under the canopy."
              />
            </div>
            <StorefrontDrawing />
          </div>
          <figcaption>The storefront on Flower Street</figcaption>
        </figure>
      </div>
    </div>
  );
}

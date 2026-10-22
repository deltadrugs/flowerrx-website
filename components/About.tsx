import { BottlesDrawing, Flourish, MortarDrawing, SprigDrawing } from "@/components/engravings";
import { Photo } from "@/components/Photo";
import { photos } from "@/lib/photos";
import type { CSSProperties } from "react";

export function About() {
  return (
    <section className="section section-tint" id="our-space" aria-labelledby="about-heading">
      <div className="wrap story">
        <div className="story-copy">
          <p className="eyebrow">Our space</p>
          <h2 id="about-heading">Brick, beams, and a counter you can walk up to</h2>
          <Flourish className="flourish-left" />
          <p>
            Flower Rx is an independent pharmacy in a fully renovated industrial building: red
            brick, reclaimed wood beams, steel-frame glass, and a pharmacy enclosed in glass and
            wood.
          </p>
          <p>
            The service is personal. You deal with this counter, not a call center. Bring a
            prescription, a refill, a transfer, or a question.
          </p>
          <p>
            The waiting area faces Flower Street through steel-grid windows. There is room to sit
            while we take care of your order.
          </p>
        </div>
        <div className="story-art">
          <div className="engraving-row">
            <div className="engraving">
              <MortarDrawing />
            </div>
            <div className="engraving engraving-sprig">
              <SprigDrawing />
            </div>
            <div className="engraving">
              <BottlesDrawing />
            </div>
          </div>
          <div className="glimpse-row">
            <figure className="glimpse">
              <div className="glimpse-frame" style={{ "--crop": "62% 42%" } as CSSProperties}>
                <Photo photo={photos.exteriorBuilding} />
              </div>
              <figcaption>Brick</figcaption>
            </figure>
            <figure className="glimpse">
              <div className="glimpse-frame" style={{ "--crop": "center 28%" } as CSSProperties}>
                <Photo photo={photos.ceilingWoodBeams} />
              </div>
              <figcaption>Beams</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

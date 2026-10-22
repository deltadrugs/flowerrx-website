import { Frame } from "@/components/Photo";
import { photos } from "@/lib/photos";

export function About() {
  return (
    <section className="section section-cream" id="our-space" aria-labelledby="about-heading">
      <div className="wrap">
        <div className="about-lead">
          <div>
            <p className="eyebrow">Our space</p>
            <h2 id="about-heading">Brick, beams, and a counter you can walk up to</h2>
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
          <Frame photo={photos.interiorCounterBrickBeams} />
        </div>
        <div className="mosaic">
          <Frame photo={photos.ceilingWoodBeams} />
          <Frame photo={photos.interiorLobbyWide} />
          <Frame photo={photos.waitingAreaWide} />
        </div>
      </div>
    </section>
  );
}

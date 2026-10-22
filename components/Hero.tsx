import { Flourish } from "@/components/engravings";
import { InkPlate } from "@/components/InkPlate";
import { Logo } from "@/components/Logo";
import { addressLine, mapsDirectionsHref, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="wrap hero-mast">
        <p className="eyebrow">Glendale, California</p>
        <Logo className="hero-logo" alt="Flower Rx Pharmacy" width={360} height={146} />
        <Flourish />
        <h1 id="hero-heading">{site.tagline}</h1>
        <p className="lede">
          An independent pharmacy for prescriptions, vaccines, compounding, and free local delivery.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={site.phoneHref}>
            Call {site.phoneDisplay}
          </a>
          <a className="btn btn-secondary" href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer">
            Get directions
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <p className="hero-address">
          <a href="./#visit">{addressLine()}</a>
        </p>
      </div>
      <InkPlate />
    </section>
  );
}

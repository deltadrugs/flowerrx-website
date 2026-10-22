import { Logo } from "@/components/Logo";
import { Rule } from "@/components/Rule";
import { HERO_DESKTOP_MEDIA, photoUrl, photos } from "@/lib/photos";
import { addressLine, mapsDirectionsHref, site } from "@/lib/site";

const desktop = photos.heroStorefrontWide;
const mobile = photos.entranceFrontDoors;

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-media">
        <picture>
          <source media={HERO_DESKTOP_MEDIA} srcSet={photoUrl(desktop, "webp")} type="image/webp" />
          <source media={HERO_DESKTOP_MEDIA} srcSet={photoUrl(desktop, "jpg")} />
          <source srcSet={photoUrl(mobile, "webp")} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoUrl(mobile, "jpg")}
            alt="Flower Rx Pharmacy storefront: red brick, steel-frame glass doors, and the carved Flower Rx Pharmacy sign."
            width={mobile.width}
            height={mobile.height}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-shade" aria-hidden="true" />
      </div>
      <div className="hero-card">
        <Logo className="hero-logo" alt="Flower Rx Pharmacy" width={220} height={89} />
        <Rule className="rule-tight" />
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
    </section>
  );
}

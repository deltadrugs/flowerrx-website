import { Frame } from "@/components/Photo";
import { Hours } from "@/components/Hours";
import { photos } from "@/lib/photos";
import { addressLine, mailtoHref, mapsDirectionsHref, mapsEmbedHref, mapsSearchHref, site } from "@/lib/site";

export function Visit() {
  return (
    <section className="section section-cream" id="visit" aria-labelledby="visit-heading">
      <div className="wrap visit-grid">
        <section id="hours" aria-labelledby="hours-heading">
          <Hours />
        </section>
        <div className="visit-copy">
          <p className="eyebrow">Visit</p>
          <h2 id="visit-heading">Come see us</h2>
          <address className="visit-address">
            <a href={mapsSearchHref()} target="_blank" rel="noopener noreferrer">
              {addressLine()}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </address>
          <ul className="contact-list contact-list-ink">
            <li>
              <span>Tel</span>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
            </li>
            <li>
              <span>Fax</span>
              <span>{site.faxDisplay}</span>
            </li>
            <li>
              <span>Email</span>
              <a href={mailtoHref()}>{site.email}</a>
            </li>
          </ul>
          <div className="hero-actions">
            <a className="btn btn-primary" href={site.phoneHref}>
              Call {site.phoneDisplay}
            </a>
            <a className="btn btn-secondary" href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer">
              Get directions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="map-frame">
            <iframe
              title="Map of Flower Rx Pharmacy at 1851 Flower Street, Glendale, California"
              src={mapsEmbedHref()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <Frame className="visit-photo" photo={photos.exteriorStreetView} />
        <Frame className="visit-photo" photo={photos.heroStorefrontSign} />
      </div>
    </section>
  );
}

import { Frame } from "@/components/Photo";
import { photos } from "@/lib/photos";
import { services } from "@/lib/services";

export function Services() {
  return (
    <section className="section section-paper" id="services" aria-labelledby="services-heading">
      <div className="wrap">
        <p className="eyebrow">The counter</p>
        <h2 id="services-heading">How we can help</h2>
        <p className="intro">
          Call us or come in. We do not collect prescriptions, insurance details, or other health
          information on this website.
        </p>
        <ul className="service-grid">
          {services.map((service) => (
            <li key={service.number} className="service-card">
              <p className="service-number">{service.number}</p>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </li>
          ))}
        </ul>
        <div className="trio">
          <Frame photo={photos.pharmacyGlassEnclosure} />
          <Frame photo={photos.pharmacyInteriorShelves} />
          <Frame photo={photos.otcShelvesBrickWall} />
        </div>
      </div>
    </section>
  );
}

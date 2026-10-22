import { Flourish } from "@/components/engravings";
import { services } from "@/lib/services";

export function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-heading">
      <div className="wrap">
        <p className="eyebrow">The counter</p>
        <h2 id="services-heading">How we can help</h2>
        <Flourish className="flourish-left" />
        <p className="intro">
          Call us or come in. We do not collect prescriptions, insurance details, or other health
          information on this website.
        </p>
        <ol className="labels">
          {services.map((service) => (
            <li key={service.number}>
              <article className="label">
                <p className="label-no">
                  <span>No.</span> {Number(service.number)}
                </p>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

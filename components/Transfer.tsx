import { BottlesDrawing } from "@/components/engravings";
import { addressLine, mapsDirectionsHref, site } from "@/lib/site";

export function Transfer() {
  return (
    <section className="section section-burgundy" id="transfer" aria-labelledby="transfer-heading">
      <div className="wrap transfer-layout">
        <div>
          <p className="eyebrow eyebrow-light">Transfer your prescription</p>
          <h2 id="transfer-heading">Move a prescription here</h2>
          <p>
            Moving a prescription to Flower Rx is a conversation, not a form. Call{" "}
            <a href={site.phoneHref}>{site.phoneDisplay}</a> or stop by {addressLine()}. Tell us
            which pharmacy has it now, and which medicines you want transferred. We contact them
            and request it.
          </p>
          <p>
            Please do not email health information, insurance details, or prescription lists. This
            site does not collect them.
          </p>
        </div>
        <div className="transfer-actions">
          <BottlesDrawing />
          <a className="btn btn-light" href={site.phoneHref}>
            Call {site.phoneDisplay}
          </a>
          <a className="btn btn-ghost" href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer">
            Get directions
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="transfer-note">Or stop by the counter during open hours. No form to fill out.</p>
        </div>
      </div>
    </section>
  );
}

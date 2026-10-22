import { SprigDrawing } from "@/components/engravings";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="wrap missing">
      <div className="missing-sprig">
        <SprigDrawing />
      </div>
      <p className="eyebrow">404</p>
      <h1>We can’t find that page.</h1>
      <p className="intro">
        The link may be out of date. {site.name} is at 1851 Flower Street in Glendale.
      </p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="./">
          Back to home
        </a>
        <a className="btn btn-secondary" href={site.phoneHref}>
          Call {site.phoneDisplay}
        </a>
      </div>
    </div>
  );
}

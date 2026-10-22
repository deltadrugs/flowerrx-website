import { Logo } from "@/components/Logo";
import { addressLine, mailtoHref, mapsSearchHref, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="footer-logo" href="./#top" aria-label="Flower Rx Pharmacy">
            <span className="logo-plate">
              <Logo alt="" width={168} height={68} />
            </span>
          </a>
          <p>Independent pharmacy in Glendale, California.</p>
        </div>
        <div>
          <p className="eyebrow eyebrow-light">Visit</p>
          <address>
            <a href={mapsSearchHref()} target="_blank" rel="noopener noreferrer">
              {addressLine()}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </address>
          <ul className="contact-list">
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
        </div>
        <div>
          <p className="eyebrow eyebrow-light">Hours</p>
          <ul className="hours-compact">
            <li>
              <span>Monday–Friday</span>
              <span>9:00 a.m. – 6:00 p.m.</span>
            </li>
            <li>
              <span>Saturday</span>
              <span>9:00 a.m. – 2:00 p.m.</span>
            </li>
            <li>
              <span>Sunday</span>
              <span>Closed</span>
            </li>
          </ul>
          <p className="fine">Pacific Time</p>
        </div>
      </div>
      <p className="copyright">© Flower Rx Pharmacy</p>
    </footer>
  );
}

/**
 * Flower Rx Pharmacy — public contact details.
 * Change them here and the page, footer, map, and structured data follow.
 * Hours match the sign on the front door. Times are America/Los_Angeles.
 */

export type DayHours = {
  label: string;
  /** Schema.org English day name. */
  day: string;
  display: string;
  /** 24-hour "HH:MM". Null when closed. */
  opens: string | null;
  closes: string | null;
};

export const site = {
  name: "Flower Rx Pharmacy",
  shortName: "Flower Rx",
  tagline: "Your neighborhood pharmacy in Glendale",
  domain: "www.flower-rx.us",
  url: "https://www.flower-rx.us",
  phoneDisplay: "747-286-2141",
  phoneHref: "tel:+17472862141",
  phoneSchema: "+1-747-286-2141",
  faxDisplay: "747-286-2142",
  faxSchema: "+1-747-286-2142",
  email: "contact@flower-rx.us",
  address: {
    street: "1851 Flower Street",
    city: "Glendale",
    region: "CA",
    postalCode: "91201",
    country: "US",
  },
  hours: {
    summary: "Mon–Fri 9–6 · Sat 9–2 · Sun closed",
    rows: [
      { label: "Monday", day: "Monday", display: "9:00 a.m. – 6:00 p.m.", opens: "09:00", closes: "18:00" },
      { label: "Tuesday", day: "Tuesday", display: "9:00 a.m. – 6:00 p.m.", opens: "09:00", closes: "18:00" },
      { label: "Wednesday", day: "Wednesday", display: "9:00 a.m. – 6:00 p.m.", opens: "09:00", closes: "18:00" },
      { label: "Thursday", day: "Thursday", display: "9:00 a.m. – 6:00 p.m.", opens: "09:00", closes: "18:00" },
      { label: "Friday", day: "Friday", display: "9:00 a.m. – 6:00 p.m.", opens: "09:00", closes: "18:00" },
      { label: "Saturday", day: "Saturday", display: "9:00 a.m. – 2:00 p.m.", opens: "09:00", closes: "14:00" },
      { label: "Sunday", day: "Sunday", display: "Closed", opens: null, closes: null },
    ] satisfies DayHours[],
  },
} as const;

export const nav = [
  { href: "./#services", id: "services", label: "Services" },
  { href: "./#our-space", id: "our-space", label: "Our space" },
  { href: "./#transfer", id: "transfer", label: "Transfer" },
  { href: "./#gallery", id: "gallery", label: "Gallery" },
  { href: "./#hours", id: "hours", label: "Hours" },
  { href: "./#visit", id: "visit", label: "Visit" },
] as const;

export function addressLine(): string {
  const { street, city, region, postalCode } = site.address;
  return `${street}, ${city}, ${region} ${postalCode}`;
}

export function mapsQuery(): string {
  return addressLine();
}

export function mapsDirectionsHref(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery())}`;
}

export function mapsSearchHref(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery())}`;
}

export function mapsEmbedHref(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery())}&hl=en&z=16&output=embed`;
}

export function mailtoHref(): string {
  return `mailto:${site.email}`;
}

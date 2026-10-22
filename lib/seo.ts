import { addressLine, site } from "@/lib/site";

const description =
  "Flower Rx Pharmacy is an independent neighborhood pharmacy at 1851 Flower Street in Glendale, California. Prescriptions, vaccines, compounding, and free local delivery.";

export const seo = {
  title: "Flower Rx Pharmacy | Neighborhood Pharmacy in Glendale",
  description,
} as const;

/**
 * Pharmacy is a LocalBusiness subtype. Both types are listed so the record
 * is explicit. Hours omit Sunday because the pharmacy is closed that day.
 */
export function pharmacyJsonLd() {
  const { address } = site;
  const weekday = site.hours.rows.filter((row) => row.day !== "Saturday" && row.opens && row.closes);
  const saturday = site.hours.rows.find((row) => row.day === "Saturday");

  return {
    "@context": "https://schema.org",
    "@type": ["Pharmacy", "LocalBusiness"],
    name: site.name,
    alternateName: site.shortName,
    url: `${site.url}/`,
    image: `${site.url}/photos/hero-storefront-wide.jpg`,
    logo: `${site.url}/brand/logo-horizontal.svg`,
    telephone: site.phoneSchema,
    faxNumber: site.faxSchema,
    email: site.email,
    description: seo.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine())}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: weekday.map((row) => row.day),
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: saturday?.opens,
        closes: saturday?.closes,
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Glendale",
      containedInPlace: {
        "@type": "State",
        name: "California",
      },
    },
  };
}

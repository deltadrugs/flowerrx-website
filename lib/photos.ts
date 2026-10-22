/**
 * Photograph slots for the public site.
 *
 * Every photograph is a file in `public/photos/`, and this is the only file
 * that names them. Pages import slots from here.
 *
 * Same-name swap: replace `public/photos/{file}.jpg`, then run
 * `npm run photos:webp` so `{file}.webp` matches. Or replace both files
 * yourself. Keep the pixel size, or update `width` and `height` on that slot.
 * The build checks the files against those numbers.
 *
 * One-line swap: change the `file` basename on the slot.
 *
 * Do not bake type or color overlays into the files. The hero shade, logo,
 * and text are HTML and CSS.
 *
 * Hero breakpoint is 800px (`HERO_DESKTOP_MEDIA`). The same cutoff is in
 * `app/globals.css` (`.hero` min-width: 800px). Keep them together.
 */

export const HERO_DESKTOP_MIN_PX = 800;
export const HERO_DESKTOP_MEDIA = `(min-width: ${HERO_DESKTOP_MIN_PX}px)`;

export type PhotoSlot = {
  /** Basename in public/photos, without extension. */
  file: string;
  alt: string;
  width: number;
  height: number;
  /** Ideal aspect ratio for a replacement export. */
  aspect: string;
  /** Where a visitor sees this photograph. */
  appears: readonly string[];
  /**
   * How the slot is framed. Replacements should match `aspect` and be at
   * least `width` × `height`.
   */
  frame: string;
};

export const photos = {
  heroStorefrontWide: {
    file: "hero-storefront-wide",
    alt: "Flower Rx Pharmacy storefront on Flower Street: red brick, black steel-frame glass doors, and the carved Flower Rx Pharmacy sign under a metal canopy.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Hero on screens 800px and wider", "Gallery", "Open Graph image"],
    frame:
      "Full-bleed first screen, CSS object-fit: cover, anchored near the top center so the carved sign and doors stay in frame. Wide monitors crop the sides; shorter laptop screens crop the bottom sidewalk. A cream panel covers the lower part of the screen, so keep the sign and entrance in the upper-middle.",
  },
  entranceFrontDoors: {
    file: "entrance-front-doors",
    alt: "Front entrance of Flower Rx Pharmacy under the canopy, with open glass doors and red brick walls.",
    width: 1125,
    height: 2000,
    aspect: "9:16",
    appears: ["Hero on screens under 800px", "Gallery"],
    frame:
      "Full-bleed first screen on phones, CSS object-fit: cover, anchored slightly above center. Keep the doors and sign in the middle. The cream panel covers the lower portion of the screen.",
  },
  heroStorefrontSign: {
    file: "hero-storefront-sign",
    alt: "Carved oval Flower Rx Pharmacy sign above the glass entrance.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Visit", "Gallery"],
    frame: "Shown at 4:3, not cropped.",
  },
  exteriorBuilding: {
    file: "exterior-building",
    alt: "Red brick exterior of the Flower Rx Pharmacy building under a blue sky.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["404 page", "Gallery"],
    frame: "Shown at 4:3, not cropped.",
  },
  exteriorStreetView: {
    file: "exterior-street-view",
    alt: "Street-level view of the Flower Rx Pharmacy building along Flower Street.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Visit", "Gallery"],
    frame: "Shown at 4:3, not cropped.",
  },
  interiorLobbyWide: {
    file: "interior-lobby-wide",
    alt: "Pharmacy lobby with a red brick wall, steel-grid windows, and the white counter.",
    width: 2000,
    height: 1125,
    aspect: "16:9",
    appears: ["Our space", "Gallery"],
    frame: "Shown at 16:9, not cropped.",
  },
  interiorCounterBrickBeams: {
    file: "interior-counter-brick-beams",
    alt: "Pharmacy counter and reclaimed-wood wall under exposed wood beams and black ductwork.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Our space (primary photograph)", "Gallery"],
    frame: "Shown at 4:3, not cropped.",
  },
  interiorCounterLobby: {
    file: "interior-counter-lobby",
    alt: "Polished concrete floor leading to the white pharmacy counter and over-the-counter shelves on the brick wall.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Gallery"],
    frame: "Shown at 4:3, not cropped.",
  },
  ceilingWoodBeams: {
    file: "ceiling-wood-beams",
    alt: "Wood ceiling with black ductwork, red brick, and a round skylight.",
    width: 1500,
    height: 2000,
    aspect: "3:4",
    appears: ["Our space", "Gallery"],
    frame: "Shown at 3:4, not cropped.",
  },
  pharmacyGlassEnclosure: {
    file: "pharmacy-glass-enclosure",
    alt: "Glass-walled pharmacy framed in reclaimed wood, with stocked shelves behind the counter.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Services", "Gallery"],
    frame: "Shown at 4:3, not cropped.",
  },
  pharmacyInteriorShelves: {
    file: "pharmacy-interior-shelves",
    alt: "White shelves of medication inside the pharmacy, with a team member seen from behind.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Services", "Gallery"],
    frame: "Shown at 4:3, not cropped.",
  },
  otcShelvesBrickWall: {
    file: "otc-shelves-brick-wall",
    alt: "Industrial pipe shelves of over-the-counter products against a red brick wall.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Services", "Gallery"],
    frame: "Shown at 4:3, not cropped.",
  },
  waitingAreaWide: {
    file: "waiting-area-wide",
    alt: "Waiting area with dark wood chairs, a coffee table, and steel-grid windows.",
    width: 2000,
    height: 1125,
    aspect: "16:9",
    appears: ["Our space", "Gallery"],
    frame: "Shown at 16:9, not cropped.",
  },
  waitingAreaWindows: {
    file: "waiting-area-windows",
    alt: "Waiting area beside tall steel-frame windows, with wood ceiling beams and pendant lights.",
    width: 1125,
    height: 2000,
    aspect: "9:16",
    appears: ["Gallery"],
    frame: "Shown at 9:16, not cropped.",
  },
  waitingAreaTable: {
    file: "waiting-area-table",
    alt: "Coffee table with a plant and magazines in the waiting area, and over-the-counter shelves behind.",
    width: 1125,
    height: 2000,
    aspect: "9:16",
    appears: ["Gallery"],
    frame: "Shown at 9:16, not cropped.",
  },
} as const satisfies Record<string, PhotoSlot>;

export type PhotoId = keyof typeof photos;
export type Photo = (typeof photos)[PhotoId];

export const galleryOrder = [
  "heroStorefrontWide",
  "entranceFrontDoors",
  "heroStorefrontSign",
  "exteriorStreetView",
  "exteriorBuilding",
  "interiorLobbyWide",
  "interiorCounterBrickBeams",
  "interiorCounterLobby",
  "ceilingWoodBeams",
  "pharmacyGlassEnclosure",
  "pharmacyInteriorShelves",
  "otcShelvesBrickWall",
  "waitingAreaWide",
  "waitingAreaWindows",
  "waitingAreaTable",
] as const satisfies readonly PhotoId[];

/** Root-relative is intentionally not used. A <base> tag resolves these. */
export function photoUrl(photo: { file: string }, ext: "jpg" | "webp" = "webp"): string {
  return `photos/${photo.file}.${ext}`;
}

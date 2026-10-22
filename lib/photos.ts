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
 * Do not bake type or color overlays into the files. Duotone, crops, and
 * frames are CSS. The wordmark and the line drawings are separate files.
 *
 * The page shows three photographs: the storefront plate, a brick glimpse,
 * and a beam glimpse. The other slots stay here so a later swap can point
 * one of those three at a new basename, or a design can bring a file back,
 * without hunting through components.
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
    appears: ["Hero plate, duotone, arched crop", "Open Graph image"],
    frame:
      "Arched apothecary frame, CSS object-fit: cover, object-position center 36%. The crop favors the canopy, oval sign, and steel doors. A line drawing inks over it, then this photograph fades in. Duotone is CSS, not baked in.",
  },
  entranceFrontDoors: {
    file: "entrance-front-doors",
    alt: "Front entrance of Flower Rx Pharmacy under the canopy, with open glass doors and red brick walls.",
    width: 1125,
    height: 2000,
    aspect: "9:16",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Not on the page. Portrait 9:16 of the front doors.",
  },
  heroStorefrontSign: {
    file: "hero-storefront-sign",
    alt: "Carved oval Flower Rx Pharmacy sign above the glass entrance.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Not on the page. 4:3 of the carved sign.",
  },
  exteriorBuilding: {
    file: "exterior-building",
    alt: "Red brick exterior of the Flower Rx Pharmacy building under a blue sky.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Our space, oval glimpse of brick"],
    frame:
      "Small vertical oval, CSS object-fit: cover, object-position 62% 42%, so the frame is mostly brick rather than sky or the whole building. Duotone is CSS.",
  },
  exteriorStreetView: {
    file: "exterior-street-view",
    alt: "Street-level view of the Flower Rx Pharmacy building along Flower Street.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Shown at 4:3, not cropped.",
  },
  interiorLobbyWide: {
    file: "interior-lobby-wide",
    alt: "Pharmacy lobby with a red brick wall, steel-grid windows, and the white counter.",
    width: 2000,
    height: 1125,
    aspect: "16:9",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Shown at 16:9, not cropped.",
  },
  interiorCounterBrickBeams: {
    file: "interior-counter-brick-beams",
    alt: "Pharmacy counter and reclaimed-wood wall under exposed wood beams and black ductwork.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Shown at 4:3, not cropped.",
  },
  interiorCounterLobby: {
    file: "interior-counter-lobby",
    alt: "Polished concrete floor leading to the white pharmacy counter and over-the-counter shelves on the brick wall.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Shown at 4:3, not cropped.",
  },
  ceilingWoodBeams: {
    file: "ceiling-wood-beams",
    alt: "Wood ceiling with black ductwork, red brick, and a round skylight.",
    width: 1500,
    height: 2000,
    aspect: "3:4",
    appears: ["Our space, oval glimpse of a wood beam"],
    frame:
      "Small vertical oval, CSS object-fit: cover, object-position center 28%, tight on the beams and ductwork. Duotone is CSS.",
  },
  pharmacyGlassEnclosure: {
    file: "pharmacy-glass-enclosure",
    alt: "Glass-walled pharmacy framed in reclaimed wood, with stocked shelves behind the counter.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Shown at 4:3, not cropped.",
  },
  pharmacyInteriorShelves: {
    file: "pharmacy-interior-shelves",
    alt: "White shelves of medication inside the pharmacy, with a team member seen from behind.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Shown at 4:3, not cropped.",
  },
  otcShelvesBrickWall: {
    file: "otc-shelves-brick-wall",
    alt: "Industrial pipe shelves of over-the-counter products against a red brick wall.",
    width: 2000,
    height: 1500,
    aspect: "4:3",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Shown at 4:3, not cropped.",
  },
  waitingAreaWide: {
    file: "waiting-area-wide",
    alt: "Waiting area with dark wood chairs, a coffee table, and steel-grid windows.",
    width: 2000,
    height: 1125,
    aspect: "16:9",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Shown at 16:9, not cropped.",
  },
  waitingAreaWindows: {
    file: "waiting-area-windows",
    alt: "Waiting area beside tall steel-frame windows, with wood ceiling beams and pendant lights.",
    width: 1125,
    height: 2000,
    aspect: "9:16",
    appears: ["Kept for a later swap. Not shown."],
    frame: "Shown at 9:16, not cropped.",
  },
  waitingAreaTable: {
    file: "waiting-area-table",
    alt: "Coffee table with a plant and magazines in the waiting area, and over-the-counter shelves behind.",
    width: 1125,
    height: 2000,
    aspect: "9:16",
    appears: ["Kept for a later swap. Not shown."],
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

# Flower Rx Pharmacy

Public site for [Flower Rx Pharmacy](https://www.flower-rx.us), 1851 Flower Street, Glendale, CA.

The site is a Next.js static export (`output: 'export'`) deployed to GitHub Pages by [`.github/workflows/pages.yml`](.github/workflows/pages.yml). `public/CNAME` is `www.flower-rx.us`.

Canonical URLs use the domain root. Until DNS points at GitHub Pages, the same build is also served at `https://deltadrugs.github.io/flowerrx-website/`. Asset paths are relative, and a `<base>` tag adds that project prefix only on `*.github.io`.

## Develop

```bash
npm install
npm run dev
```

```bash
npm test
npm run build
```

The export is written to `out/`.

## Photographs

All photographs live in [`public/photos/`](public/photos/). Every slot is declared in [`lib/photos.ts`](lib/photos.ts). Nothing else should name a photo file. The page shows three of them, as small duotone glimpses: the storefront plate, brick, and a wood beam. The rest stay in the folder so a later file can be swapped in without a redesign.

To swap a picture for a retouched file:

1. Replace `public/photos/{file}.jpg`, keeping the basename.
2. Run `npm run photos:webp` to rebuild the matching `.webp` (or replace the `.webp` yourself).
3. If the pixel size changed, update `width` and `height` on that slot. The build checks both files against those numbers.

To point a slot at a different basename, change its `file` line.

Do not bake text, duotone, or frames into the files. Crops, the burgundy-and-charcoal tint, and the arched frames are CSS. The Open Graph image is the raw hero JPEG.

The logo used on the page is `public/brand/logo-horizontal.svg`.

## Contact details

Address, phone, fax, email, and hours live in [`lib/site.ts`](lib/site.ts). Open and closed is calculated in `America/Los_Angeles`.

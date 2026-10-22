import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "lib", "photos.ts"), "utf8");
const files = [...source.matchAll(/file:\s*"([^"]+)"/g)].map((match) => match[1]);
const unique = [...new Set(files)];

for (const file of unique) {
  const jpg = path.join(root, "public", "photos", `${file}.jpg`);
  const webp = path.join(root, "public", "photos", `${file}.webp`);
  if (!fs.existsSync(jpg)) {
    console.error(`Missing ${jpg}`);
    process.exitCode = 1;
    continue;
  }
  await sharp(jpg).webp({ quality: 82 }).toFile(webp);
  console.log(`Wrote public/photos/${file}.webp`);
}

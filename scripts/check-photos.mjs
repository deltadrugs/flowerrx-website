import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const photosDir = path.join(root, "public", "photos");
const source = fs.readFileSync(path.join(root, "lib", "photos.ts"), "utf8");

const slotRe =
  /file:\s*"([^"]+)",\s*alt:\s*"(?:[^"\\]|\\.)*",\s*width:\s*(\d+),\s*height:\s*(\d+)/g;

const slots = [];
for (const match of source.matchAll(slotRe)) {
  slots.push({ file: match[1], width: Number(match[2]), height: Number(match[3]) });
}

if (slots.length !== 15) {
  console.error(`Expected 15 photo slots in lib/photos.ts, found ${slots.length}.`);
  process.exit(1);
}

const heroMin = Number(source.match(/HERO_DESKTOP_MIN_PX = (\d+)/)?.[1]);
const css = fs.readFileSync(path.join(root, "app", "globals.css"), "utf8");
const layout = fs.readFileSync(path.join(root, "app", "layout.tsx"), "utf8");
if (!css.includes(`min-width: ${heroMin}px`) || !layout.includes(`max-width: ${heroMin - 1}px`)) {
  console.error(`Hero breakpoint ${heroMin}px is out of sync between lib/photos.ts, globals.css, and layout.tsx.`);
  process.exit(1);
}

let failed = false;

for (const slot of slots) {
  for (const ext of ["jpg", "webp"]) {
    const filePath = path.join(photosDir, `${slot.file}.${ext}`);
    if (!fs.existsSync(filePath)) {
      console.error(`Missing public/photos/${slot.file}.${ext}`);
      failed = true;
      continue;
    }
    const size = imageSize(fs.readFileSync(filePath), ext);
    if (!size) {
      console.error(`Could not read dimensions of public/photos/${slot.file}.${ext}`);
      failed = true;
      continue;
    }
    if (size.width !== slot.width || size.height !== slot.height) {
      console.error(
        `public/photos/${slot.file}.${ext} is ${size.width}×${size.height} but lib/photos.ts says ${slot.width}×${slot.height}. Update width and height on that slot.`,
      );
      failed = true;
    }
  }
}

const banned = [
  "googletagmanager",
  "google-analytics",
  "gtag(",
  "facebook.net",
  "hotjar",
  "segment.com",
  "intercom",
  "plausible.io",
  "cookieyes",
  "crisp.chat",
  "tawk.to",
];

const files = walk(root, [".ts", ".tsx", ".css", ".mjs", ".json", ".yml"]);
for (const file of files) {
  if (file.endsWith(`${path.sep}scripts${path.sep}check-photos.mjs`)) continue;
  if (file.includes(`${path.sep}node_modules${path.sep}`) || file.includes(`${path.sep}out${path.sep}`)) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const token of banned) {
    if (text.toLowerCase().includes(token)) {
      console.error(`Disallowed tracker-like token "${token}" in ${path.relative(root, file)}`);
      failed = true;
    }
  }
  if (file.endsWith(".tsx") && /<(form|input|textarea)\b/i.test(text)) {
    console.error(`Patient or contact form markup is not allowed: ${path.relative(root, file)}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`Checked ${slots.length} photo slots.`);

function walk(dir, extensions) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git" || entry.name === "out") {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, extensions));
    else if (extensions.some((ext) => entry.name.endsWith(ext))) out.push(full);
  }
  return out;
}

function imageSize(buf, ext) {
  if (ext === "jpg") return jpegSize(buf);
  return webpSize(buf);
}

function jpegSize(data) {
  let i = 2;
  while (i < data.length - 8) {
    if (data[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = data[i + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return { height: data.readUInt16BE(i + 5), width: data.readUInt16BE(i + 7) };
    }
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      i += 2;
      continue;
    }
    const length = data.readUInt16BE(i + 2);
    i += 2 + length;
  }
  return null;
}

function webpSize(data) {
  if (data.toString("ascii", 0, 4) !== "RIFF" || data.toString("ascii", 8, 12) !== "WEBP") return null;
  const chunk = data.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    return {
      width: 1 + data.readUIntLE(24, 3),
      height: 1 + data.readUIntLE(27, 3),
    };
  }
  if (chunk === "VP8 ") {
    return {
      width: data.readUInt16LE(26) & 0x3fff,
      height: data.readUInt16LE(28) & 0x3fff,
    };
  }
  if (chunk === "VP8L") {
    const bits = data.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  return null;
}

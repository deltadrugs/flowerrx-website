/**
 * The static export is one set of files served at two URL prefixes:
 *   /                              on www.flower-rx.us
 *   /flowerrx-website/             on deltadrugs.github.io
 *
 * Next emits root-absolute /_next URLs. This script makes those relative and
 * moves the <base> tag to the first position in <head>. The inline script then
 * points the base at the project subpath only on *.github.io.
 * CSS url() values are rewritten relative to the stylesheet, because <base>
 * does not apply inside CSS.
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function hoistBase(html) {
  const base = html.match(/<base\b[^>]*id="site-base"[^>]*>/i)?.[0];
  const script = html.match(/<script\b[^>]*id="site-base-script"[^>]*>[\s\S]*?<\/script>/i)?.[0];
  if (!base || !script) {
    throw new Error("Built HTML is missing the site <base> tag or its script.");
  }
  const stripped = html.replace(base, "").replace(script, "");
  return stripped.replace(/<head([^>]*)>/i, `<head$1>${base}${script}`);
}

function relativizeHtml(html) {
  return html
    .replaceAll('"/_next/', '"_next/')
    .replaceAll('"/manifest.webmanifest', '"manifest.webmanifest')
    .replaceAll('"/favicon.ico', '"favicon.ico')
    .replaceAll('"/favicon-32.png', '"favicon-32.png')
    .replaceAll('"/apple-touch-icon.png', '"apple-touch-icon.png')
    .replaceAll('"/photos/', '"photos/')
    .replaceAll('"/brand/', '"brand/');
}

function relativizeCss(css, file) {
  return css.replace(/url\((['"]?)(\/[^)'"]+)\1\)/g, (full, quote, absPath) => {
    const target = path.join(outDir, absPath);
    let rel = path.relative(path.dirname(file), target).split(path.sep).join("/");
    if (!rel.startsWith(".")) rel = `./${rel}`;
    return `url(${quote}${rel}${quote})`;
  });
}

/**
 * Next's client runtime requests chunks from a root-absolute public path.
 * Point that path at the host that is actually serving the site.
 */
function patchJs(js) {
  const replacement =
    '(/(^|\\.)github\\.io$/i.test(location.hostname)?"/flowerrx-website/_next/":"/_next/")';
  let next = js;
  const patterns = [
    /([.])p\s*=\s*"\/_next\/"/g,
    /([.])p\s*=\s*'\/_next\/'/g,
    /([,[{])p:"\/_next\/"/g,
  ];
  for (const pattern of patterns) {
    next = next.replace(pattern, (match, prefix) => {
      if (prefix === "." ) return `.p=${replacement}`;
      return `${prefix}p:${replacement}`;
    });
  }
  return next;
}

const files = walk(outDir);
let htmlCount = 0;
let cssCount = 0;
let jsPatched = 0;

for (const file of files) {
  if (file.endsWith(".html")) {
    const before = fs.readFileSync(file, "utf8");
    const after = relativizeHtml(hoistBase(before));
    if (after !== before) fs.writeFileSync(file, after);
    htmlCount += 1;
  } else if (file.endsWith(".css")) {
    const before = fs.readFileSync(file, "utf8");
    const after = relativizeCss(before, file);
    if (after !== before) {
      fs.writeFileSync(file, after);
      cssCount += 1;
    }
  } else if (file.endsWith(".js")) {
    const before = fs.readFileSync(file, "utf8");
    const after = patchJs(before);
    if (after !== before) {
      fs.writeFileSync(file, after);
      jsPatched += 1;
    }
  }
}

const sample = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
if (!sample.startsWith("<!DOCTYPE html>") && !sample.includes("<html")) {
  throw new Error("index.html looks empty.");
}
const head = sample.slice(sample.indexOf("<head"), sample.indexOf("<head") + 500);
if (!head.includes('id="site-base"') || head.indexOf('id="site-base"') > head.indexOf("stylesheet")) {
  if (head.includes("stylesheet") && head.indexOf("site-base") > head.indexOf("stylesheet")) {
    throw new Error("Base tag is still after the stylesheet.");
  }
}
if (sample.includes('href="/_next/') || sample.includes('src="/_next/')) {
  throw new Error("Root-absolute /_next URLs remain in index.html.");
}
if (!fs.existsSync(path.join(outDir, "CNAME"))) {
  throw new Error("CNAME missing from the export.");
}
const cname = fs.readFileSync(path.join(outDir, "CNAME"), "utf8").trim();
if (cname !== "www.flower-rx.us") {
  throw new Error(`Unexpected CNAME: ${cname}`);
}

console.log(`Relativized ${htmlCount} HTML files, ${cssCount} CSS files, patched ${jsPatched} JS files.`);

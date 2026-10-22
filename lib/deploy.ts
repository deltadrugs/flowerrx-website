/**
 * GitHub Pages project URL prefix. The custom domain serves the same files
 * at the root, so this prefix is applied only when the hostname is *.github.io.
 * Keep the inline script in sync with scripts/relativize-export.mjs, which
 * moves this tag to the start of <head> so it wins before stylesheets load.
 */
export const GITHUB_PAGES_BASE = "/flowerrx-website/";

export const baseTagScript = `(function(){var b=document.querySelector("base");if(!b)return;if(/(^|\\.)github\\.io$/i.test(location.hostname))b.setAttribute("href",${JSON.stringify(GITHUB_PAGES_BASE)});})();`;

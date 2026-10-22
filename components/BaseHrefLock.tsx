"use client";

import { GITHUB_PAGES_BASE } from "@/lib/deploy";
import { useEffect } from "react";

/** Re-apply the host-specific base if hydration resets the attribute. */
export function BaseHrefLock() {
  useEffect(() => {
    const apply = () => {
      const base = document.querySelector("base");
      if (!base) return;
      const href = /(^|\.)github\.io$/i.test(location.hostname) ? GITHUB_PAGES_BASE : "/";
      if (base.getAttribute("href") !== href) base.setAttribute("href", href);
    };
    apply();
    const base = document.querySelector("base");
    if (!base) return;
    const observer = new MutationObserver(apply);
    observer.observe(base, { attributes: true, attributeFilter: ["href"] });
    return () => observer.disconnect();
  }, []);

  return null;
}

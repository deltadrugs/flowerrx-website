"use client";

import { Logo } from "@/components/Logo";
import { OpenStatus } from "@/components/OpenStatus";
import { nav, site } from "@/lib/site";
import { useEffect, useId, useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const panelId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-bar">
        <a className="brand" href="./#top" aria-label="Flower Rx Pharmacy">
          <Logo alt="" width={132} height={54} />
        </a>
        <nav id={panelId} className={open ? "nav-panel is-open" : "nav-panel"} aria-label="Primary">
          <ul className="nav-list">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={current === item.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <OpenStatus className="header-status" />
          <a className="btn btn-primary header-call" href={site.phoneHref} aria-label={`Call ${site.phoneDisplay}`}>
            <span className="call-short">Call</span>
            <span className="call-full">Call {site.phoneDisplay}</span>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="burger" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

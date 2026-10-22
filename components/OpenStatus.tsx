"use client";

import { isOpenAt } from "@/lib/hours";
import { useEffect, useState } from "react";

export function OpenStatus({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(isOpenAt(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (open === null) {
    return (
      <p className={`status status-pending ${className}`.trim()} aria-hidden="true">
        <span className="status-dot" />
        Hours
      </p>
    );
  }

  return (
    <p className={`status ${open ? "status-open" : "status-closed"} ${className}`.trim()} role="status">
      <span className="status-dot" aria-hidden="true" />
      {open ? "Open now" : "Closed"}
    </p>
  );
}

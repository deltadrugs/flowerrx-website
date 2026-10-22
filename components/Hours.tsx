"use client";

import { Logo } from "@/components/Logo";
import { OpenStatus } from "@/components/OpenStatus";
import { weekdayInLa } from "@/lib/hours";
import { site } from "@/lib/site";
import { useEffect, useState } from "react";

export function Hours() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setToday(weekdayInLa(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hours-card">
      <Logo className="hours-logo" alt="Flower Rx Pharmacy" width={150} height={61} />
      <p className="eyebrow">Hours of operation</p>
      <div className="hours-heading-row">
        <h2 id="hours-heading">Hours</h2>
        <OpenStatus />
      </div>
      <table className="hours-table">
        <caption className="sr-only">Weekly hours in Pacific Time. Sunday the pharmacy is closed.</caption>
        <tbody>
          {site.hours.rows.map((row) => {
            const isToday = today === row.day;
            return (
              <tr key={row.day} className={isToday ? "is-today" : undefined}>
                <th scope="row">
                  {row.label}
                  {isToday ? <span className="today-tag">Today</span> : null}
                </th>
                <td>{row.display}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="fine">Pacific Time (Los Angeles). The open or closed badge uses that clock.</p>
    </div>
  );
}

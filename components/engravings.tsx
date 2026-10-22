import type { CSSProperties } from "react";

function ink(end: number, span: number): CSSProperties {
  return { ["--end" as string]: String(end), ["--span" as string]: String(span) };
}

function courses(x1: number, x2: number, y0: number, y1: number, step: number) {
  const parts: string[] = [];
  for (let y = y0; y <= y1 + 0.1; y += step) parts.push(`M${x1} ${y}H${x2}`);
  return parts.join(" ");
}

/** Steel-frame grid, drawn as one stroke. */
function panes(x: number, y: number, w: number, h: number, cols: number, rows: number) {
  const parts = [`M${x} ${y}h${w}v${h}h${-w}Z`];
  for (let i = 1; i < cols; i += 1) {
    const px = (x + (w * i) / cols).toFixed(1);
    parts.push(`M${px} ${y}V${y + h}`);
  }
  for (let i = 1; i < rows; i += 1) {
    const py = (y + (h * i) / rows).toFixed(1);
    parts.push(`M${x} ${py}H${x + w}`);
  }
  return parts.join(" ");
}

/**
 * Elevation of the Flower Street facade: brick courses, canopy,
 * carved oval, and the black steel doors. Strokes are staggered
 * with --end / --span so the plate can ink them in sequence.
 */
export function StorefrontDrawing() {
  const k = 0.5523;
  const oval = (cx: number, cy: number, rx: number, ry: number) => {
    const kx = rx * k;
    const ky = ry * k;
    return `M${cx} ${cy - ry}C${cx + kx} ${cy - ry} ${cx + rx} ${cy - ky} ${cx + rx} ${cy}C${cx + rx} ${cy + ky} ${cx + kx} ${cy + ry} ${cx} ${cy + ry}C${cx - kx} ${cy + ry} ${cx - rx} ${cy + ky} ${cx - rx} ${cy}C${cx - rx} ${cy - ky} ${cx - kx} ${cy - ry} ${cx} ${cy - ry}Z`;
  };

  return (
    <svg className="plate-lines" viewBox="0 -32 320 478" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
        <path className="ink-line" pathLength={1} style={ink(0.16, 0.16)} d="M46 90H274V392H46Z M22 164H298" />
        <path
          className="ink-line"
          pathLength={1}
          style={ink(0.36, 0.2)}
          d={`${courses(54, 108, 102, 150, 12)} ${courses(212, 266, 102, 150, 12)} ${courses(54, 108, 200, 376, 12)} ${courses(212, 266, 200, 376, 12)} M62 114V126M90 138V150M246 114V126M230 150V162M72 224V236M246 260V272`}
        />
        <path
          className="ink-line"
          pathLength={1}
          style={ink(0.52, 0.2)}
          d={`M22 162H298M22 162C22 174 28 186 40 186M298 162C298 174 292 186 280 186M108 196H212V386H108Z ${panes(116, 214, 40, 160, 2, 5)} ${panes(164, 214, 40, 160, 2, 5)} M108 196H212V212H108Z M136 292h4M180 292h4`}
        />
        <path
          className="ink-line"
          pathLength={1}
          style={ink(0.7, 0.18)}
          d={`${oval(160, 124, 46, 30)} ${oval(160, 124, 38, 23)} M160 112c4-8 12-10 12-4 0 4-4 6-6 8 4 1 10 4 10 9 0 6-8 8-12 4-4 4-12 2-12-4 0-5 6-8 10-9-2-2-6-4-6-8 0-6 8-4 12 4z M152 132c6 5 12 5 16 0`}
        />
        <path className="ink-line" pathLength={1} style={ink(0.8, 0.1)} d="M96 392H224V408H96Z M18 418H302" />
      </g>
    </svg>
  );
}

export function MortarDrawing() {
  return (
    <svg viewBox="0 0 160 150" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 78h104" />
        <path d="M36 78c2 28 18 42 44 42s42-14 44-42" />
        <path d="M48 80c2 18 12 28 32 28s30-10 32-28" />
        <path d="M58 96c6 8 14 12 22 12" />
        <path d="M70 90c4 6 10 8 16 6" />
        <path d="M102 34c8-10 26-8 30 6 2 8-2 14-8 18L92 92" />
        <path d="M108 46c10-2 20 2 22 10" />
        <ellipse cx="122" cy="32" rx="7" ry="5" transform="rotate(-28 122 32)" />
        <path d="M46 120h68M52 126h56" />
      </g>
    </svg>
  );
}

export function BottlesDrawing() {
  return (
    <svg viewBox="0 0 180 150" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M38 46h14v10c8 4 14 16 14 28v36H24V84c0-12 6-24 14-28V46z" />
        <path d="M40 40h10v6H40z" />
        <path d="M34 96h28M36 70c6 2 14 2 20 0" />
        <path d="M86 28h16v14l10 10v62H76V52l10-10V28z" />
        <path d="M88 20h12v8H88z" />
        <path d="M84 78h28v22H84z" />
        <path d="M90 88h16M98 84v12" />
        <path d="M142 58c8 0 16 8 16 20v36h-32V78c0-12 6-20 16-20z" />
        <path d="M136 50h12v8h-12z" />
        <path d="M132 96h24" />
        <path d="M18 132h150" />
      </g>
    </svg>
  );
}

export function SprigDrawing() {
  return (
    <svg viewBox="0 0 80 168" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 158C38 120 44 86 36 28" />
        <path d="M38 52c-14-2-24 8-26 16 10 2 20-2 26-10z" />
        <path d="M38 54c-8 6-14 8-20 6" />
        <path d="M40 70c16-6 26 2 30 14-12 2-22-2-28-10z" />
        <path d="M42 74c8 6 16 8 24 4" />
        <path d="M36 96c-16 0-24 12-24 20 12 0 20-6 24-14z" />
        <path d="M36 100c-8 6-12 10-16 10" />
        <path d="M38 118c14-2 24 8 26 18-10 0-18-6-24-14z" />
        <path d="M40 122c8 6 14 8 20 6" />
        <path d="M36 28c2-10 8-16 8-16s2 8-2 16" />
        <path d="M30 22c6 2 10 8 10 8M46 20c-2 6-8 10-8 10" />
      </g>
    </svg>
  );
}

export function Flourish({ className = "" }: { className?: string }) {
  return (
    <div className={`flourish ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 220 16">
        <path
          d="M2 8h78M140 8h78M110 8l6-6 6 6-6 6-6-6zM98 8c6-8 18-8 18 0M128 8c-6-8-18-8-18 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return (
    <div className={`rule ${className}`.trim()} aria-hidden="true">
      <span />
      <svg viewBox="0 0 10 10" width="10" height="10">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
      </svg>
      <span />
    </div>
  );
}

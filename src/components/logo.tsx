export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      {/* A braced frame: the simplest true statement about structure. */}
      <rect x="1.5" y="1.5" width="25" height="25" />
      <path d="M1.5 26.5 26.5 1.5" />
      <path d="M1.5 14h25M14 1.5v25" strokeOpacity="0.34" />
      <rect x="11" y="11" width="6" height="6" fill="currentColor" stroke="none" className="text-copper" />
    </svg>
  );
}

export function Wordmark({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Mark className="h-7 w-7 shrink-0 text-copper" />
      <span className="flex flex-col leading-none">
        <span
          className="text-[1.0625rem] font-semibold tracking-[0.13em]"
          style={{ fontStretch: "96%" }}
        >
          DAIMA
        </span>
        {compact ? null : (
          <span className="t-label-sm mt-1 opacity-58">Civil Engineering Works</span>
        )}
      </span>
    </span>
  );
}

type IconName =
  | "code"
  | "sparkles"
  | "clock"
  | "search"
  | "shuffle"
  | "chevronDown"
  | "chevronUp"
  | "arrowRight"
  | "copy"
  | "check";

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  switch (name) {
    case "code":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M9 3l1.5 4.5L15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5L9 3z" />
          <path d="M19 11l.9 2.7L22 14.6l-2.1.9L19 18l-.9-2.5L16 14.6l2.1-.9L19 11z" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "shuffle":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M16 3h5v5" />
          <path d="M4 20l16-16" />
          <path d="M16 21h5v-5" />
          <path d="M4 4l6 6" />
          <path d="M14 14l6 6" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "chevronUp":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M18 15l-6-6-6 6" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M5 12h14" />
          <path d="M13 5l7 7-7 7" />
        </svg>
      );
    case "copy":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    default:
      return null;
  }
}

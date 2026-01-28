import { Icon } from "./Icon";

export function BrandBadge() {
  return (
    <div
      className="grid h-10 w-10 place-items-center rounded-[10px] bg-gradient-to-b from-cc-accent to-cc-accent2"
      aria-hidden
    >
      <Icon name="code" className="h-5 w-5 text-indigo-100" />
    </div>
  );
}

export function Pill({
  icon,
  children,
}: {
  icon: "sparkles" | "clock";
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex h-[30px] items-center justify-center gap-2 rounded-full border border-cc-border bg-cc-surface px-3 py-2">
      <Icon
        name={icon}
        className={
          "h-4 w-4 " +
          (icon === "sparkles" ? "text-cc-accent" : "text-cc-muted")
        }
      />
      <span className="text-xs font-semibold text-cc-text">{children}</span>
    </div>
  );
}

export function Chip({
  variant,
  children,
}: {
  variant: "easy" | "default";
  children: React.ReactNode;
}) {
  if (variant === "easy") {
    return (
      <span className="inline-flex h-7 items-center justify-center rounded-full border border-indigo-800/90 bg-indigo-950/60 px-3 text-xs font-bold text-indigo-200">
        {children}
      </span>
    );
  }

  return (
    <span className="inline-flex h-7 items-center justify-center rounded-full border border-cc-border bg-cc-surface2 px-3 text-xs font-bold text-cc-text">
      {children}
    </span>
  );
}

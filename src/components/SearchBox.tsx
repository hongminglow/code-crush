import { forwardRef } from "react";
import { Icon } from "./Icon";

export const SearchBox = forwardRef<
  HTMLInputElement,
  {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }
>(function SearchBox({ value, onChange, placeholder }, ref) {
  return (
    <div className="flex h-10 w-[260px] items-center gap-2 rounded-xl border border-cc-border bg-cc-surface px-3">
      <Icon name="search" className="h-[18px] w-[18px] text-cc-muted" />
      <input
        ref={ref}
        className="min-w-0 flex-1 bg-transparent text-sm text-cc-text placeholder:text-cc-muted focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search questions…"}
        aria-label="Search questions"
      />
      <span className="inline-flex items-center justify-center rounded-lg border border-cc-border bg-cc-bg px-2 py-1 text-[11px] font-semibold text-cc-muted">
        Ctrl K
      </span>
    </div>
  );
});

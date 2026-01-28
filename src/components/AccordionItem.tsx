import { useEffect, useMemo, useState } from "react";
import type { Difficulty, Question } from "../data/types";
import { Chip } from "./Badge";
import { Icon } from "./Icon";

function difficultyVariant(difficulty: Difficulty) {
  if (difficulty === "Easy") return "easy";
  return "default";
}

function normalizeWhitespace(text: string) {
  return text.replace(/\r\n/g, "\n");
}

export function AccordionItem({
  question,
  open,
  onToggleOpen,
  solved,
  onToggleSolved,
  revealSolutions,
}: {
  question: Question;
  open: boolean;
  onToggleOpen: () => void;
  solved: boolean;
  onToggleSolved: () => void;
  revealSolutions?: boolean;
}) {
  const code = useMemo(
    () => normalizeWhitespace(question.code.content),
    [question.code.content],
  );
  const [copied, setCopied] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const solutionVisible = Boolean(revealSolutions) || showSolution;

  useEffect(() => {
    if (open && !revealSolutions) setShowSolution(false);
  }, [open, question.id, revealSolutions]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1000);
    } catch {
      // ignore
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-cc-border bg-cc-surface">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left"
        onClick={onToggleOpen}
      >
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-cc-text">
            {question.title}
          </div>
          <div className="truncate text-xs font-semibold text-cc-muted">
            {question.subtitle}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Chip variant={difficultyVariant(question.difficulty)}>
            {question.difficulty}
          </Chip>
          <Icon
            name={open ? "chevronUp" : "chevronDown"}
            className="h-[18px] w-[18px] text-cc-muted"
          />
        </div>
      </button>

      {open ? (
        <div className="space-y-4 px-6 pb-5">
          <p className="text-sm font-medium leading-relaxed text-cc-text">
            {question.prompt}
          </p>

          <div className="rounded-xl border border-indigo-800/90 bg-cc-surface2 p-5 shadow-glow">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-cc-accent">
                Solution (Code)
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSolution((prev) => !prev);
                  }}
                  className={
                    "inline-flex items-center gap-2 rounded-lg border border-cc-border bg-cc-bg px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 " +
                    (solutionVisible
                      ? "text-indigo-200 hover:text-cc-text"
                      : "text-cc-muted hover:text-cc-text")
                  }
                  aria-pressed={solutionVisible}
                >
                  <Icon
                    name={solutionVisible ? "eyeOff" : "eye"}
                    className="h-4 w-4"
                  />
                  {solutionVisible ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!solutionVisible) return;
                    copy();
                  }}
                  className={
                    "inline-flex items-center gap-2 rounded-lg border border-cc-border bg-cc-bg px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 " +
                    (solutionVisible
                      ? "text-cc-muted hover:text-cc-text"
                      : "cursor-not-allowed text-cc-muted/40")
                  }
                  aria-label="Copy code"
                  disabled={!solutionVisible}
                >
                  <Icon name={copied ? "check" : "copy"} className="h-4 w-4" />
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSolved();
                  }}
                  className={
                    "inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold transition-colors " +
                    (solved
                      ? "border-indigo-800/90 bg-indigo-950/60 text-indigo-200"
                      : "border-cc-border bg-cc-bg text-cc-muted hover:text-cc-text")
                  }
                >
                  {solved ? "Solved" : "Mark solved"}
                </button>
              </div>
            </div>

            {solutionVisible ? (
              <>
                <pre className="overflow-x-auto rounded-lg bg-cc-bg p-4 text-xs leading-relaxed text-cc-text">
                  <code className="font-mono">{code}</code>
                </pre>

                {question.complexity ? (
                  <div className="mt-3 text-xs font-semibold text-cc-muted">
                    Time: {question.complexity.time} • Space:{" "}
                    {question.complexity.space}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="rounded-lg border border-cc-border bg-cc-bg p-4 text-xs font-semibold text-cc-muted">
                Solution hidden — click{" "}
                <span className="text-cc-text">Show</span> when you’re ready.
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {question.tags.map((t) => (
              <span
                key={t}
                className="inline-flex h-7 items-center justify-center rounded-full border border-cc-border bg-cc-surface2 px-3 text-xs font-bold text-cc-text"
              >
                {t}
              </span>
            ))}
            {question.source?.name === "LeetCode" && question.source.url ? (
              <a
                href={question.source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 items-center justify-center rounded-full border border-cc-border bg-cc-surface2 px-3 text-xs font-bold text-cc-text hover:text-cc-accent"
              >
                LeetCode
                <Icon name="arrowRight" className="ml-2 h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

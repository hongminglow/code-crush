import { useMemo, useState } from "react";
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

function cleanPrompt(prompt: string) {
  return normalizeWhitespace(prompt)
    .replace(/^\s*Prompt:\s*/i, "")
    .trim();
}

function deriveStarterFromSolution(solution: string) {
  const s = normalizeWhitespace(solution).trim();

  const fn = s.match(/function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/);
  if (fn) {
    return `function ${fn[1]}(${fn[2]}) {\n  // TODO: implement\n}\n`;
  }

  const cls = s.match(/class\s+([A-Za-z_$][\w$]*)\s*\{/);
  if (cls) {
    const className = cls[1];
    const methodNames = Array.from(
      new Set(
        Array.from(s.matchAll(/\n\s*([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{/g))
          .map((m) => ({ name: m[1], args: m[2] }))
          .filter(
            (m) => m.name !== "if" && m.name !== "for" && m.name !== "while",
          ),
      ),
    );

    const methods = methodNames
      .slice(0, 6)
      .map((m) => `  ${m.name}(${m.args}) {\n    // TODO\n  }`)
      .join("\n\n");

    return `class ${className} {\n  constructor(/* ... */) {\n    // TODO\n  }\n\n${methods || "  // TODO"}\n}\n`;
  }

  return "// Start here\n// Write your solution in JavaScript\n";
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
  const starter = useMemo(() => {
    if (question.starter?.content)
      return normalizeWhitespace(question.starter.content);
    return deriveStarterFromSolution(question.code.content);
  }, [question.starter, question.code.content]);
  const [copied, setCopied] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const solutionVisible = Boolean(revealSolutions) || showSolution;

  const problemText = question.details?.description
    ? normalizeWhitespace(question.details.description)
    : cleanPrompt(question.prompt);

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
        onClick={() => {
          if (open && !revealSolutions) setShowSolution(false);
          onToggleOpen();
        }}
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
          <div className="space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-wide text-cc-muted">
              Problem
            </div>
            <div className="text-sm font-medium leading-relaxed text-cc-text whitespace-pre-line">
              {problemText}
            </div>
          </div>

          {question.details?.examples?.length ? (
            <div className="rounded-xl border border-cc-border bg-cc-surface2 p-4">
              <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-cc-muted">
                Examples
              </div>
              <div className="space-y-3">
                {question.details.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-cc-border bg-cc-bg p-3"
                  >
                    <div className="mb-2 text-xs font-bold text-cc-text">
                      Example {idx + 1}
                    </div>
                    <pre className="whitespace-pre-wrap text-xs font-semibold leading-relaxed text-cc-muted">
                      {`Input: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ""}`}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-cc-border bg-cc-surface2 p-4">
              <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-cc-muted">
                Examples
              </div>
              <div className="text-xs font-semibold text-cc-muted">
                No examples added yet for this prompt.
              </div>
            </div>
          )}

          {question.details?.constraints?.length ? (
            <div className="rounded-xl border border-cc-border bg-cc-surface2 p-4">
              <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-cc-muted">
                Constraints
              </div>
              <div className="space-y-1 text-xs font-semibold text-cc-muted">
                {question.details.constraints.map((c) => (
                  <div key={c}>• {c}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-cc-border bg-cc-surface2 p-4">
              <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-cc-muted">
                Constraints
              </div>
              <div className="text-xs font-semibold text-cc-muted">
                No constraints added yet for this prompt.
              </div>
            </div>
          )}

          <div className="rounded-xl border border-cc-border bg-cc-surface2 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-cc-text">
                Starter (JS)
              </div>
              <div className="text-xs font-semibold text-cc-muted">
                Write yours first, then reveal
              </div>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-cc-bg p-4 text-xs leading-relaxed text-cc-text">
              <code className="font-mono">{starter}</code>
            </pre>
          </div>

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

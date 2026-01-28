import { useEffect, useMemo, useRef, useState } from "react";
import { AccordionItem } from "./components/AccordionItem";
import { BrandBadge, Pill } from "./components/Badge";
import { Icon } from "./components/Icon";
import { SearchBox } from "./components/SearchBox";
import { categories, questions } from "./data/content";
import type { CategoryId, Question } from "./data/types";
import { loadSolvedIds, saveSolvedIds } from "./lib/storage";

function normalizeQuery(value: string) {
  return value.trim().toLowerCase();
}

function matchesQuestion(q: Question, query: string) {
  if (!query) return true;
  const detailsText = q.details
    ? [
        q.details.description,
        (q.details.examples ?? [])
          .map((ex) =>
            [ex.input, ex.output, ex.explanation].filter(Boolean).join("\n"),
          )
          .join("\n"),
        (q.details.constraints ?? []).join("\n"),
      ].join("\n")
    : "";
  const hay = [q.title, q.subtitle, q.prompt, q.tags.join(" ")]
    .concat(detailsText)
    .join("\n")
    .toLowerCase();
  return hay.includes(query);
}

function initialCategoryFromHash(): CategoryId {
  const raw = window.location.hash.replace(/^#/, "");
  const ids = new Set(categories.map((c) => c.id));
  return ids.has(raw as CategoryId) ? (raw as CategoryId) : "arrays";
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(() =>
    initialCategoryFromHash(),
  );
  const [query, setQuery] = useState("");
  const [revealSolutions, setRevealSolutions] = useState(false);
  const queryNorm = useMemo(() => normalizeQuery(query), [query]);

  const searchRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef(new Map<string, HTMLDivElement | null>());

  const [solvedIds, setSolvedIds] = useState<Set<string>>(() =>
    loadSolvedIds(),
  );
  const solvedCount = solvedIds.size;

  const category = useMemo(
    () => categories.find((c) => c.id === activeCategory) ?? categories[0],
    [activeCategory],
  );

  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => q.category === activeCategory)
      .filter((q) => matchesQuestion(q, queryNorm));
  }, [activeCategory, queryNorm]);

  const [expandedId, setExpandedId] = useState<string | undefined>(() => {
    const first = questions.find(
      (q) => q.category === initialCategoryFromHash(),
    );
    return first?.id;
  });

  const effectiveExpandedId = useMemo(() => {
    if (!filteredQuestions.length) return undefined;
    if (!expandedId) return undefined;
    if (filteredQuestions.some((q) => q.id === expandedId)) return expandedId;
    return filteredQuestions[0].id;
  }, [expandedId, filteredQuestions]);

  useEffect(() => {
    const onHash = () => setActiveCategory(initialCategoryFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    // Keep the URL in sync with the active tab.
    if (window.location.hash.replace(/^#/, "") !== activeCategory) {
      window.location.hash = activeCategory;
    }
  }, [activeCategory]);

  useEffect(() => {
    saveSolvedIds(solvedIds);
  }, [solvedIds]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      if (!isCtrlK) return;
      e.preventDefault();
      searchRef.current?.focus();
      searchRef.current?.select();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function setCategory(id: CategoryId) {
    setActiveCategory(id);
  }

  function toggleSolved(id: string) {
    setSolvedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function randomPick() {
    if (!filteredQuestions.length) return;
    const idx = Math.floor(Math.random() * filteredQuestions.length);
    const id = filteredQuestions[idx].id;
    setExpandedId(id);
    requestAnimationFrame(() => {
      const el = itemRefs.current.get(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="min-h-screen bg-cc-bg text-cc-text">
      <header className="sticky top-0 z-10 border-b border-cc-border bg-cc-surface2">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-8 py-4">
          <div className="flex items-center gap-3">
            <BrandBadge />
            <div className="leading-tight">
              <div className="text-base font-bold">Code Crush</div>
              <div className="text-xs font-medium text-cc-muted">
                Logic Thinking • Algorithms • JavaScript
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-2 rounded-full bg-transparent p-[6px]">
            {categories.map((c) => {
              const active = c.id === activeCategory;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={
                    "h-8 rounded-full px-3 text-sm font-semibold transition-colors " +
                    (active
                      ? "text-cc-accent"
                      : "text-cc-muted hover:text-cc-text")
                  }
                  aria-current={active ? "page" : undefined}
                >
                  {c.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <SearchBox
              ref={searchRef}
              value={query}
              onChange={setQuery}
              placeholder="Search questions…"
            />
            <button
              type="button"
              onClick={() => setRevealSolutions((v) => !v)}
              className={
                "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-transparent px-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 " +
                (revealSolutions
                  ? "text-cc-accent hover:text-cc-text"
                  : "text-cc-muted hover:text-cc-text")
              }
              aria-pressed={revealSolutions}
              aria-label={revealSolutions ? "Hide solutions" : "Show solutions"}
            >
              <Icon
                name={revealSolutions ? "eyeOff" : "eye"}
                className="h-[18px] w-[18px]"
              />
              Solutions
            </button>
            <button
              type="button"
              onClick={randomPick}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-transparent px-3 text-sm font-bold text-cc-accent transition-colors hover:text-cc-text"
            >
              <Icon name="shuffle" className="h-[18px] w-[18px]" />
              Random
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {category.headerTitle}
          </h1>
          <p className="max-w-3xl text-sm font-medium leading-relaxed text-cc-muted">
            {category.headerSubtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Pill icon="sparkles">Interview Focus</Pill>
            <Pill icon="clock">Estimate: 30–60 mins/day</Pill>
            <div className="ml-auto flex items-center gap-2 text-xs font-semibold text-cc-muted">
              <span>Solved:</span>
              <span className="text-cc-text">{solvedCount}</span>
              <span>/</span>
              <span className="text-cc-text">
                {questions.filter((q) => q.category === activeCategory).length}
              </span>
              {queryNorm ? (
                <span className="ml-2 rounded-full border border-cc-border bg-cc-surface px-3 py-1">
                  {filteredQuestions.length} result
                  {filteredQuestions.length === 1 ? "" : "s"}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {filteredQuestions.length ? (
            filteredQuestions.map((q) => (
              <div
                key={q.id}
                ref={(el) => {
                  itemRefs.current.set(q.id, el);
                }}
              >
                <AccordionItem
                  question={q}
                  open={effectiveExpandedId === q.id}
                  onToggleOpen={() =>
                    setExpandedId(
                      effectiveExpandedId === q.id ? undefined : q.id,
                    )
                  }
                  solved={solvedIds.has(q.id)}
                  onToggleSolved={() => toggleSolved(q.id)}
                  revealSolutions={revealSolutions}
                />
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-cc-border bg-cc-surface p-8">
              <div className="text-sm font-semibold text-cc-text">
                No matches
              </div>
              <div className="mt-1 text-sm font-medium text-cc-muted">
                Try a different keyword (title, tag, or prompt).
              </div>
              <button
                type="button"
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-cc-border bg-cc-bg px-4 py-2 text-sm font-semibold text-cc-muted hover:text-cc-text"
                onClick={() => setQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const KEY = "codecrush:v1";

type StoredState = {
  solvedIds: string[];
};

function safeParse(json: string | null): StoredState | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as StoredState;
  } catch {
    return null;
  }
}

export function loadSolvedIds(): Set<string> {
  const parsed = safeParse(localStorage.getItem(KEY));
  return new Set(parsed?.solvedIds ?? []);
}

export function saveSolvedIds(solvedIds: Set<string>) {
  const payload: StoredState = { solvedIds: Array.from(solvedIds) };
  localStorage.setItem(KEY, JSON.stringify(payload));
}

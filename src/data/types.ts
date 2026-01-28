export type CategoryId = "arrays" | "trees" | "graphs" | "dp" | "javascript";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type CodeLanguage = "js";

export type Question = {
  id: string;
  category: CategoryId;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  tags: string[];
  prompt: string;
  code: {
    language: CodeLanguage;
    content: string;
  };
  complexity?: {
    time: string;
    space: string;
  };
  source?: {
    name: "LeetCode" | "Custom";
    url?: string;
  };
};

export type Category = {
  id: CategoryId;
  label: string;
  headerTitle: string;
  headerSubtitle: string;
};

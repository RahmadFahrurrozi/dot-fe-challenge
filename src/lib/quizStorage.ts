import type { QuizProgress, QuizResult } from "@/types/quiz";

const QUIZ_PROGRESS_KEY = "quiz_progress";
const QUIZ_RESULT_KEY = "quiz_result";

export const storage = {
  // Quiz Progress
  saveQuizProgress: (progress: QuizProgress): void => {
    try {
      localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Error saving quiz progress:", error);
    }
  },

  getQuizProgress: (): QuizProgress | null => {
    try {
      const saved = localStorage.getItem(QUIZ_PROGRESS_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Error loading quiz progress:", error);
      return null;
    }
  },

  clearQuizProgress: (): void => {
    localStorage.removeItem(QUIZ_PROGRESS_KEY);
  },

  // Quiz Result
  saveQuizResult: (result: QuizResult): void => {
    try {
      localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(result));
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  },

  getQuizResult: (): QuizResult | null => {
    try {
      const saved = localStorage.getItem(QUIZ_RESULT_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Error loading quiz result:", error);
      return null;
    }
  },

  clearQuizResult: (): void => {
    localStorage.removeItem(QUIZ_RESULT_KEY);
  },
};

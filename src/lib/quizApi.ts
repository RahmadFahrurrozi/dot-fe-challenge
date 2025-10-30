import type { QuizApiResponse, QuizQuestion } from "@/types/quiz";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://opentdb.com/api.php";
const DEFAULT_AMOUNT = parseInt(import.meta.env.VITE_QUIZ_AMOUNT) || 10;
const DEFAULT_CATEGORY = parseInt(import.meta.env.VITE_QUIZ_CATEGORY) || 21;
const DEFAULT_DIFFICULTY = import.meta.env.VITE_QUIZ_DIFFICULTY || "easy";
const DEFAULT_TYPE = import.meta.env.VITE_QUIZ_TYPE || "multiple";

const decodeHtml = (html: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface QuizApiOptions {
  amount?: number;
  category?: number;
  difficulty?: string;
  type?: string;
}

export const quizApi = {
  getQuestions: async (
    options: QuizApiOptions = {}
  ): Promise<QuizQuestion[]> => {
    try {
      const {
        amount = DEFAULT_AMOUNT,
        category = DEFAULT_CATEGORY,
        difficulty = DEFAULT_DIFFICULTY,
        type = DEFAULT_TYPE,
      } = options;

      const url = new URL(BASE_URL);
      url.searchParams.append("amount", amount.toString());
      url.searchParams.append("category", category.toString());
      url.searchParams.append("difficulty", difficulty);
      url.searchParams.append("type", type);

      console.log("Fetching questions from:", url.toString());

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: QuizApiResponse = await response.json();

      if (data.response_code !== 0) {
        throw new Error("Failed to fetch questions from API");
      }

      return data.results.map((question) => ({
        ...question,
        question: decodeHtml(question.question),
        correct_answer: decodeHtml(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map(decodeHtml),
        all_answers: shuffleArray([
          decodeHtml(question.correct_answer),
          ...question.incorrect_answers.map(decodeHtml),
        ]),
      }));
    } catch (error) {
      console.error("Quiz API Error:", error);
      throw new Error("Failed to load quiz questions. Please try again.");
    }
  },
};

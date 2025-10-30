export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers?: string[];
}

export interface QuizApiResponse {
  response_code: number;
  results: QuizQuestion[];
}

export interface UserAnswer {
  questionIndex: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  userAnswers: UserAnswer[];
  timeSpent: number;
}

export interface QuizProgress {
  questions: QuizQuestion[];
  userAnswers: UserAnswer[];
  currentQuestionIndex: number;
  timeLeft: number;
  quizStarted: boolean;
  quizCompleted: boolean;
  startTime: number;
}

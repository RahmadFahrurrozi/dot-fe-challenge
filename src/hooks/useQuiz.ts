import { useState, useEffect, useCallback } from "react";
import type {
  QuizQuestion,
  QuizResult,
  UserAnswer,
  QuizProgress,
} from "@/types/quiz";
import { quizApi } from "@/lib/quizApi";
import { storage } from "@/lib/quizStorage";

const QUIZ_DURATION = 600; // 10 minutes in seconds

export const useQuiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [startTime, setStartTime] = useState<number>(0);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = storage.getQuizProgress();
    if (savedProgress) {
      setQuestions(savedProgress.questions);
      setUserAnswers(savedProgress.userAnswers);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      setTimeLeft(savedProgress.timeLeft);
      setQuizStarted(savedProgress.quizStarted);
      setQuizCompleted(savedProgress.quizCompleted);
      setStartTime(savedProgress.startTime || Date.now());
    }
  }, []);

  // Save progress whenever relevant state changes
  useEffect(() => {
    if (quizStarted && questions.length > 0) {
      const progress: QuizProgress = {
        questions,
        userAnswers,
        currentQuestionIndex,
        timeLeft,
        quizStarted,
        quizCompleted,
        startTime,
      };
      storage.saveQuizProgress(progress);
    }
  }, [
    questions,
    userAnswers,
    currentQuestionIndex,
    timeLeft,
    quizStarted,
    quizCompleted,
    startTime,
  ]);

  useEffect(() => {
    if (!quizStarted || quizCompleted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeLeft]);

  const startQuiz = useCallback(async (questionCount: number = 10) => {
    try {
      setIsLoading(true);
      setError(null);

      const quizQuestions = await quizApi.getQuestions({
        amount: questionCount,
      });
      setQuestions(quizQuestions);
      setQuizStarted(true);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setQuizCompleted(false);
      setTimeLeft(QUIZ_DURATION);
      setStartTime(Date.now());
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load questions";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const submitAnswer = useCallback(
    (answer: string) => {
      if (!questions[currentQuestionIndex]) return;

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = answer === currentQuestion.correct_answer;

      const userAnswer: UserAnswer = {
        questionIndex: currentQuestionIndex,
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect,
      };

      const newUserAnswers = [...userAnswers, userAnswer];
      setUserAnswers(newUserAnswers);

      // Move to next question or complete quiz
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        completeQuiz(newUserAnswers);
      }
    },
    [questions, currentQuestionIndex, userAnswers]
  );

  const handleTimeUp = useCallback(() => {
    completeQuiz(userAnswers);
  }, [userAnswers]);

  const completeQuiz = useCallback(
    (answers: UserAnswer[]) => {
      const correctAnswers = answers.filter(
        (answer) => answer.isCorrect
      ).length;
      const timeSpent = QUIZ_DURATION - timeLeft;

      const result: QuizResult = {
        totalQuestions: questions.length,
        correctAnswers,
        wrongAnswers: answers.length - correctAnswers,
        score: (correctAnswers / questions.length) * 100,
        userAnswers: answers,
        timeSpent,
      };

      setQuizCompleted(true);
      storage.saveQuizResult(result);
      storage.clearQuizProgress();
    },
    [questions.length, timeLeft]
  );

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizStarted(false);
    setQuizCompleted(false);
    setTimeLeft(QUIZ_DURATION);
    setError(null);
    setStartTime(0);
    storage.clearQuizProgress();
    storage.clearQuizResult();
  }, []);

  const resumeQuiz = useCallback(() => {
    setQuizStarted(true);
  }, []);

  const hasSavedProgress = useCallback((): boolean => {
    return storage.getQuizProgress() !== null;
  }, []);

  return {
    // State
    questions,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    userAnswers,
    isLoading,
    error,
    quizStarted,
    quizCompleted,
    timeLeft,
    totalQuestions: questions.length,
    answeredQuestions: userAnswers.length,

    // Actions
    startQuiz,
    submitAnswer,
    resetQuiz,
    resumeQuiz,
    hasSavedProgress,
  };
};

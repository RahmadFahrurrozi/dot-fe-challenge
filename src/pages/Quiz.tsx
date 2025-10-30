import { useQuiz } from "@/hooks/useQuiz";
import QuizStart from "@/components/quiz/QuizStart";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResults from "@/components/quiz/QuizResult";
import { storage } from "@/lib/quizStorage";
import type { QuizResult } from "@/types/quiz";
import LoadingQuiz from "@/components/quiz/LoadingQuiz";
import ErrorQuiz from "@/components/quiz/ErrorQuiz";
import NoResultFound from "@/components/quiz/NoResultFound";

export default function QuizPage() {
  const {
    currentQuestion,
    currentQuestionIndex,
    isLoading,
    error,
    quizStarted,
    quizCompleted,
    timeLeft,
    totalQuestions,
    answeredQuestions,
    startQuiz,
    submitAnswer,
    resetQuiz,
    resumeQuiz,
    hasSavedProgress,
  } = useQuiz();

  const getQuizResult = (): QuizResult | null => {
    if (quizCompleted) {
      return storage.getQuizResult();
    }
    return null;
  };

  if (isLoading && !quizStarted) {
    return <LoadingQuiz />;
  }

  if (error && !quizStarted) {
    return <ErrorQuiz />;
  }

  // Show results
  if (quizCompleted) {
    const result = getQuizResult();
    if (!result) {
      return <NoResultFound />;
    }
    return <QuizResults result={result} onRestart={resetQuiz} />;
  }

  if (quizStarted && currentQuestion) {
    return (
      <QuizQuestion
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        timeLeft={timeLeft}
        onSubmitAnswer={submitAnswer}
      />
    );
  }

  return (
    <>
      <QuizStart
        onStartQuiz={startQuiz}
        onResumeQuiz={resumeQuiz}
        hasSavedProgress={hasSavedProgress()}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle2, BarChart3 } from "lucide-react";
import type { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { formatTime } from "@/utils/timeFormat";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  answeredQuestions: number;
  timeLeft: number;
  onSubmitAnswer: (answer: string) => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  answeredQuestions,
  timeLeft,
  onSubmitAnswer,
}: QuizQuestionProps) {
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header dengan Progress */}
        <h1 className="text-2xl">Quiz Challenge</h1>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Quiz Progress</span>
              <span>
                {answeredQuestions} / {totalQuestions}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Info Bar */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">
                  Question {questionNumber} of {totalQuestions}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <BarChart3 className="w-4 h-4" />
                <span>
                  {answeredQuestions} answered •{" "}
                  {totalQuestions - answeredQuestions} remaining
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-2 rounded-full">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="font-mono text-sm font-bold text-yellow-700">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.all_answers?.map((answer, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full cursor-pointer justify-start h-auto py-4 px-4 text-left whitespace-normal hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => onSubmitAnswer(answer)}
              >
                <span className="text-base font-normal leading-relaxed">
                  {answer}
                </span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-muted px-4 py-2 rounded-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">
                Category:
              </span>
              <span className="text-sm font-semibold">{question.category}</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">
                Difficulty:
              </span>
              <span className="text-sm text-green-500 font-semibold capitalize">
                {question.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

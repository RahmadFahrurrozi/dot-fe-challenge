import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, Trophy, RotateCcw } from "lucide-react";
import type { QuizResult } from "@/types/quiz";
import { formatTimeWithUnits } from "@/utils/timeFormat";

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
}

const QuizResults = ({ result, onRestart }: QuizResultsProps) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number): string => {
    if (score >= 80) return "Excellent!";
    if (score >= 60) return "Good job!";
    if (score >= 40) return "Not bad!";
    return "Practice Make Perfect!";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score */}
          <div className="text-center">
            <div
              className={`text-5xl font-bold ${getScoreColor(
                result.score
              )} mb-2`}
            >
              {result.score.toFixed(1)}%
            </div>
            <p className="text-lg font-semibold text-muted-foreground">
              {getScoreMessage(result.score)}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-600">
                {result.correctAnswers}
              </div>
              <div className="text-xs text-green-600 font-medium">Correct</div>
            </div>

            <div className="text-center p-3 bg-red-50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-red-600">
                {result.wrongAnswers}
              </div>
              <div className="text-xs text-red-600 font-medium">Wrong</div>
            </div>

            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-blue-600">
                {formatTimeWithUnits(result.timeSpent)}
              </div>
              <div className="text-xs text-blue-600 font-medium">Time</div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Questions:</span>
              <span className="font-semibold">{result.totalQuestions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Answered:</span>
              <span className="font-semibold">
                {result.correctAnswers + result.wrongAnswers}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Accuracy:</span>
              <span className="font-semibold">
                {(
                  (result.correctAnswers / result.totalQuestions) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>

          {/* Restart Button */}
          <Button
            onClick={onRestart}
            className="w-full cursor-pointer"
            size="lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Another Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;

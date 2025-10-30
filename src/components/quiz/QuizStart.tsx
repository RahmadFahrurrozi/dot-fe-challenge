import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Play,
  RotateCcw,
  Clock,
  Target,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface QuizStartProps {
  onStartQuiz: (questionCount: number) => void;
  onResumeQuiz: () => void;
  hasSavedProgress: boolean;
  isLoading: boolean;
  error: string | null;
}

export default function QuizStart({
  onStartQuiz,
  onResumeQuiz,
  hasSavedProgress,
  isLoading,
  error,
}: QuizStartProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Quiz Challenge</CardTitle>
          <CardDescription>
            Test your knowledge with our interactive quiz
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 justify-center">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-red-700 text-sm text-center">{error}</p>
              </div>
            </div>
          )}

          {/* Quiz Info */}
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>10 minutes time limit</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>10 multiple choice questions</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-4 h-4" />
              <span>Auto-save progress</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {hasSavedProgress && (
              <Button
                onClick={onResumeQuiz}
                variant="outline"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Resume Previous Quiz
              </Button>
            )}

            <Button
              onClick={() => onStartQuiz(10)}
              disabled={isLoading}
              className="w-full cursor-pointer"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading Questions...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start New Quiz
                </>
              )}
            </Button>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">How it works:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• One question per page</li>
              <li>• Timer: 10 minutes total</li>
              <li>• Progress automatically saved</li>
              <li>• See results with detailed stats</li>
              <li>• Total questions & progress shown</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

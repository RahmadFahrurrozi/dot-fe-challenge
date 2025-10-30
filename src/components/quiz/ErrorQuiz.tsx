import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useQuiz } from "@/hooks/useQuiz";

const ErrorQuiz = () => {
  const { error, startQuiz } = useQuiz();
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-sm">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => startQuiz(10)} variant="outline">
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorQuiz;

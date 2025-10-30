import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useQuiz } from "@/hooks/useQuiz";

const NoResultFound = () => {
  const { resetQuiz } = useQuiz();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto" />
        <h2 className="text-xl font-semibold">No results found</h2>
        <Button onClick={resetQuiz}>Start New Quiz</Button>
      </div>
    </div>
  );
};

export default NoResultFound;

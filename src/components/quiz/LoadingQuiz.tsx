import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingQuiz = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <DotLottieReact src="loadingAnimation.lottie" loop autoplay />
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    </div>
  );
};

export default LoadingQuiz;

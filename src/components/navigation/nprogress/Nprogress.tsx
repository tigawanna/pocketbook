import { useNProgress } from "@tanem/react-nprogress";
import { Container, Bar } from "./parts";

interface NprogressProps {
  isAnimating: boolean;
}

export function Nprogress({ isAnimating }: NprogressProps) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });
  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
}

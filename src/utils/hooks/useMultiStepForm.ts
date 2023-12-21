import { ReactElement, startTransition, useState } from "react";

interface UseMultiStepForm {
  title: string;
  component: ReactElement;
}
export function useMultiStepForm(steps: UseMultiStepForm[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    startTransition(() => {
      setCurrentStepIndex((i) => {
        if (i >= steps.length - 1) return i;
        return i + 1;
      });
    });
  }

  function back() {
    startTransition(() => {
      setCurrentStepIndex((i) => {
        if (i <= 0) return i;
        return i - 1;
      });
    });
  }

  function goTo(index: number) {
    startTransition(() => {
      setCurrentStepIndex(index);
    });
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}

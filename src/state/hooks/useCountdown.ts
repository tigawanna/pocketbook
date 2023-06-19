import { useState, useEffect } from "react";

export function useCountdown(initialValue = 1, callback?: () => void) {
  const [countdownValue, setCountdownValue] = useState(initialValue);
  function start(delay = 5) {
    setCountdownValue(delay);
  }

  useEffect(() => {
    if (countdownValue === 0) {
      callback && callback();
    }

    const intervalId = setInterval(() => {
      setCountdownValue(countdownValue - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdownValue, callback]);

  return { countdownValue, start };
}

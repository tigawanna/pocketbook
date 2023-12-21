import { useEffect, useState } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: -1, height: -1 });

  useEffect(() => {
    if (window) {
      setWindowSize({ width: window?.innerWidth, height: window?.innerHeight });
    }
  }, []);

  useEffect(() => {
    if (window) {
      const handleResize = () => {
        setWindowSize({
          width: window?.innerWidth,
          height: window?.innerHeight,
        });
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return windowSize;
}

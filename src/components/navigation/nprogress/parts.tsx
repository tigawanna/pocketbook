interface ContainerProps {
  animationDuration: number;
  isFinished: boolean;
  children: React.ReactNode;
}

export function Container({
  animationDuration,
  isFinished,
  children,
}: ContainerProps) {
  return (
    <div
      style={{
        opacity: isFinished ? 0 : 1,
        pointerEvents: "none",
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      {children}
    </div>
  );
}

interface BarProps {
  animationDuration: number;
  progress: number;
}

export function Bar({ animationDuration, progress }: BarProps) {
  return (
    <div
      className="bg-accent"
      style={{
        // background: "#29d",
        height: 4,
        left: 0,
        marginLeft: `${(-1 + progress) * 100}%`,
        position: "fixed",
        top: 0,
        transition: `margin-left ${animationDuration}ms linear`,
        width: "100%",
        zIndex: 1031,
      }}
    >
      <div
        style={{
          boxShadow: "0 0 10px #29d, 0 0 5px #29d",
          display: "block",
          height: "100%",
          opacity: 1,
          position: "absolute",
          right: 0,
          transform: "rotate(3deg) translate(0px, -4px)",
          width: 100,
        }}
      />
    </div>
  );
}

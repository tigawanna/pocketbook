interface SidePanelProps {}

export function SidePanel({}: SidePanelProps) {
  return (
    <div className="w-full h-full flex gap-2">
      <div
        className="min-h-[200px] h-full w-full bg-base-300 border shadow-lg rounded-lg
    flex items-center justify-center"
      >
        <div
          className="h-[50%] w-full  rounded-lg
    flex items-center justify-center"
        >
          Timeline
        </div>
      </div>
    </div>
  );
}

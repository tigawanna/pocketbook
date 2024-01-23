import { ErrorBoundary } from "rakkasjs";

interface ErrorBoundaryComponentProps {
    children: React.ReactNode;
}

export default function ErrorBoundaryComponent({ children }: ErrorBoundaryComponentProps) {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }: 
        { error: Error; resetErrorBoundary: () => void }) => {
          return (
            <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
              <div className="p-5 text-error bg-error/10 rounded-lg ">
                <h1 className="text-2xl font-bold text-center">
                  Something went wrong
                </h1>

                <p className="space-t-2">{error.message}</p>
              </div>
              <button
                className="btn btn-wide"
                onClick={() => {
                  resetErrorBoundary();
                }}
              >
                Try again
              </button>
            </div>
          );}}
    >
      {children}
    </ErrorBoundary>
  );
}

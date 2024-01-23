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
            <div className="w-full  flex flex-col gap-5 justify-center items-center">
              <h1 className="text-2xl text-error">Something went wrong</h1>
           
              <p className="p-5 text-error bg-error/10 rounded-lg">
                {error.message}
              </p>
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

"use client";
interface UseClientWrapperProps {
  children: React.ReactNode;
}

export function UseClientWrapper({ children }: UseClientWrapperProps) {
  return <>{children}</>;
}

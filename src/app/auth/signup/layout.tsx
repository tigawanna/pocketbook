export const metadata = {
  title: "signup",
  description: "Create a new account",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

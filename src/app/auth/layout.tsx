export const metadata = {
  title: "login",
  description: "login for a better experiance",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

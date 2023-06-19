export const metadata = {
  title: "Profile",
  description: "User profile page",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

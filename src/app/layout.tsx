import "./globals.css";
import { Inter } from "next/font/google";
import { getPBCookieUser } from "@/state/pb/server_component_pb";
import { Theme } from "@/state/hooks/useThemeHook";
import { cookies } from "next/headers";
import { AppWrapper } from "./root/AppWrapper";

const inter = Inter({ subsets: ["latin"] });
export const revalidate = 60
export const metadata = {
  title: "pocketbook",
  description:
    "Minimal site for your creative output , built with Next.js appdir and pocketbase ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme_cookie = cookies()?.get("theme");
  const theme = theme_cookie?.value as Theme | undefined;
  const user = await getPBCookieUser();
  return (
    <html lang="en" className={theme}>
      <body className={inter.className}>
        <AppWrapper user={user} theme={theme}>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}

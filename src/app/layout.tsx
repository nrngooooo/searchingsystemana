import type { Metadata } from "next";
import ThemeProviderWrapper from "./ThemeProviderWrapper";

export const metadata: Metadata = {
  title: "Search Next App",
  description: "Searching for people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}

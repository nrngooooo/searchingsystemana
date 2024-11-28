import type { Metadata } from "next";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import { ApolloWrapper } from "@/container/ApolloWrapper";

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
        <ApolloWrapper>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}

import ThemeProvider from "@/components/organisms/theme";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import ClearStorageButton from "@/components/atoms/clear-storage-button";
import StyledComponentsRegistry from "@/components/organisms/styled-components-registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuizEd",
  description: "Real-time quiz game for education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="h-screen">
        <ThemeProvider>
          <StyledComponentsRegistry>
            {children}
            <ClearStorageButton />
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}

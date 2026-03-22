import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-red-hat",
  display: "swap",
});

export const metadata = {
  title: "Home Inspect — AI-Powered Scheduling",
  description:
    "Professional home inspection services. Chat with our AI assistant to explore services or book your inspection in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${redHatDisplay.variable} h-full`}>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-red-hat), sans-serif" }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

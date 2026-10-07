import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LKS - Learning Knowledge Solution",
    template: "%s | LKS",
  },

  description:
    "LKS - Learning Knowledge Solution, Jaipur. Online and classroom learning for students from Class 6 to 12, programming and digital marketing.",

  keywords: [
    "LKS",
    "Learning Knowledge Solution",
    "LKS Jaipur",
    "coaching institute Jaipur",
    "online learning",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
    "PCM",
    "Programming",
    "Digital Marketing",
  ],

  authors: [
    {
      name: "LKS - Learning Knowledge Solution",
    },
  ],

  openGraph: {
    title: "LKS - Learning Knowledge Solution",
    description:
      "Professional education and online learning platform in Jaipur, Rajasthan.",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "LKS - Learning Knowledge Solution",
    description: "Professional education and online learning platform.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body cz-shortcut-listen="true">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Tiro_Devanagari_Hindi, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const tiro = Tiro_Devanagari_Hindi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-tiro",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Wedding Roster",
  description: "A simple roster for our wedding guests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${tiro.variable} ${poppins.variable}`}>{children}</body>
    </html>
  );
}

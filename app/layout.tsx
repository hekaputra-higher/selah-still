import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Selah Still — Make room for Scripture",
  description:
    "Read slowly. Reflect through D.W.E.L.L. Keep a private journal of your time in Scripture.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

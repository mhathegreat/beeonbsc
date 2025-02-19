import "./globals.css";

export const metadata = {
  title: "Bee on BNB",
  description: "Bzzz! Your AI-powered Bee on BNB. What's buzzing?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}

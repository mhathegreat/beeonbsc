import "./globals.css";

export const metadata = {
  title: "Bee on BSC",
  description: "Bzzz! Your AI-powered Bee on BSC. What's buzzing?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}

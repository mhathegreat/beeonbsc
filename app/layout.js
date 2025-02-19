import "./globals.css";

export const metadata = {
  title: "Bee on BSC",
  description: "Bzzz! Your AI-powered Bee on BSC. What's buzzing?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black text-gold font-helvetica">{children}</body>
    </html>
  );
}

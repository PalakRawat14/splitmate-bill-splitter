import "./globals.css";

export const metadata = {
  title: "SplitMate - Split the Bill Calculator",
  description:
    "A simple split-the-bill calculator for friends, trips, food orders, and shared expenses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

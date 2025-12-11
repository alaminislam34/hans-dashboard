import "../globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Management tutor or parents.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main className="min-h-screen min-w-screen">{children}</main>
      </body>
    </html>
  );
}

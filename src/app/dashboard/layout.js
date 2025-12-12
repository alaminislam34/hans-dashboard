import { ToastContainer } from "react-toastify";
import "../globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Management tutor or parents.",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main>{children}</main>
        <ToastContainer position="bottom-center" autoClose={1500} />
      </body>
    </html>
  );
}

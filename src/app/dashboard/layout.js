import { ToastContainer } from "react-toastify";
import "../globals.css";
import Sidebar from "./components/Sidebar/Sidebar";

export const metadata = {
  title: "Admin Dashboard",
  description: "Management tutor or parents.",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main className="lg:grid lg:grid-cols-10 p-6 gap-6">
          <div className="col-span-2">
            <Sidebar />
          </div>
          <section className="col-span-8">{children}</section>
        </main>

        <ToastContainer position="bottom-center" autoClose={1500} />
      </body>
    </html>
  );
}

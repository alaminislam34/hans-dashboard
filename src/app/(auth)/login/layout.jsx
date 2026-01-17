// app/dashboard/layout.js
import { Toaster } from "react-hot-toast";
import "../../globals.css";
import { StateProvider } from "../../providers/StateProvider";

export default function DashboardLayout({ children }) {
  return (
    <main className="flex h-screen overflow-hidden bg-white">
      <StateProvider>
        <Toaster position="top-center" />
        {children}
      </StateProvider>
    </main>
  );
}

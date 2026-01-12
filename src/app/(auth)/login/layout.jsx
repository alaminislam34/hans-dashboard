// app/dashboard/layout.js
import "../../globals.css";
import { StateProvider } from "../../providers/StateProvider";

export default function DashboardLayout({ children }) {
  return (
    <main className="flex h-screen overflow-hidden bg-white">
      <StateProvider>{children}</StateProvider>
    </main>
  );
}

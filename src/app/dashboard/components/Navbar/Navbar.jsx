import { Bell } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-4  my-2">
      <h1 className="text-xl md:text-2xl">Dashboard management</h1>
      <Bell />
    </div>
  );
}

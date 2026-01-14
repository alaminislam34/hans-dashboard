"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  FileText,
  IdCard,
  Smartphone,
  Settings,
  LayoutGrid,
} from "lucide-react";
import { HiOutlineLogout } from "react-icons/hi";
import toast from "react-hot-toast";
import { useGlobalState } from "@/app/providers/StateProvider";

const SIDELINKS = [
  {
    name: "Dashboard",
    icon: <LayoutGrid size={22} />,
    href: "/dashboard",
    match: (path) => path === "/dashboard" || /^\/dashboard\/\d+$/.test(path),
  },
  {
    name: "Tutor Verification",
    icon: <IdCard size={22} />,
    href: "/dashboard/tutor_verify",
    match: (path) => path.startsWith("/dashboard/tutor_verify"),
  },
  {
    name: "Class Management",
    icon: <IdCard size={22} />,
    href: "/dashboard/class_manage",
    match: (path) => path.startsWith("/dashboard/class_manage"),
  },
  {
    name: "User Management",
    icon: <Users size={22} />,
    href: "/dashboard/users_manage",
    match: (path) => path.startsWith("/dashboard/users_manage"),
  },
  {
    name: "Review Management",
    icon: <FileText size={22} />,
    href: "/dashboard/review_manage",
    match: (path) => path.startsWith("/dashboard/review_manage"),
  },
  {
    name: "Support Management",
    icon: <Smartphone size={22} />,
    href: "/dashboard/support_manage",
    match: (path) => path.startsWith("/dashboard/support_manage"),
  },
  {
    name: "System Settings",
    icon: <Settings size={22} />,
    href: "/dashboard/system_settings",
    match: (path) => path.startsWith("/dashboard/system_settings"),
  },
];

const Sidebar = () => {
  const { user } = useGlobalState();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Add your logout logic here
    toast.success("Logout successful");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen lg:w-67 xl:w-77">
      <div className="h-full p-4">
        <div className="flex flex-col justify-between p-6 bg-[#F8FBFF] transition-all rounded-2xl h-full">
          <div>
            {/* User Profile Section */}
            <div className="flex items-center gap-4 mt-6 mb-10">
              <div className="relative w-12 h-12 overflow-hidden rounded-lg border border-gray-100">
                <Image
                  src={user?.image ? user?.image : "/images/user.jpg"}
                  fill
                  priority
                  sizes="48px"
                  alt="Admin Profile"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <h2 className="text-sm md:text-base font-bold text-slate-900 truncate">
                  {user?.name ? user?.name : "Al Amin Islam"}
                </h2>
                <p className="text-xs md:text-sm text-gray-500 truncate">
                  {user?.email ? user?.email : "admin@gmail.com"}
                </p>
              </div>
            </div>

            <nav>
              <ul className="flex flex-col gap-2">
                {SIDELINKS.map((link) => {
                  const isActive = link.match(pathname);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`
                      group flex items-center gap-3 px-4 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-50 text-primary shadow-sm ring-1 ring-blue-100"
                          : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                      }
                    `}
                      >
                        <span
                          className={`${
                            isActive
                              ? "text-primary"
                              : "text-gray-400 group-hover:text-primary"
                          }`}
                        >
                          {link.icon}
                        </span>
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full px-5 py-3 mt-auto font-semibold text-white transition-all rounded-xl bg-primary hover:bg-blue-700 hover:shadow-lg active:scale-95 group"
          >
            <span>Logout</span>
            <HiOutlineLogout className="text-xl transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

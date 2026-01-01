"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGlobalState } from "@/app/providers/StateProvider";
import {
  Bell,
  Menu,
  X,
  Users,
  FileText,
  IdCard,
  Smartphone,
  Settings,
  LayoutGrid,
} from "lucide-react";
import { HiOutlineLogout } from "react-icons/hi";

// 1. Move static data outside the component to prevent re-creation on every render
const NAV_LINKS = [
  { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { name: "Tutor Verification", icon: IdCard, href: "/dashboard/tutor_verify" },
  { name: "User Management", icon: Users, href: "/dashboard/users_manage" },
  {
    name: "Review Management",
    icon: FileText,
    href: "/dashboard/review_manage",
  },
  {
    name: "Support Management",
    icon: Smartphone,
    href: "/dashboard/support_manage",
  },
  {
    name: "System Settings",
    icon: Settings,
    href: "/dashboard/system_settings",
  },
];

const DashboardNavbar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useGlobalState();
  const pathname = usePathname();

  // 2. Derive the page title dynamically based on the current path
  const pageTitle = useMemo(() => {
    const activeLink = NAV_LINKS.find((link) => link.href === pathname);
    return activeLink ? activeLink.name : "Management";
  }, [pathname]);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <nav className="p-2 md:p-3 lg:p-4 rounded-xl flex items-center justify-between gap-3 relative z-30">
      {/* --- Left Section: Mobile Menu & Title --- */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 border border-primary/50 rounded-xl text-primary hover:bg-primary hover:text-white transition-colors duration-300 lg:hidden shrink-0"
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base md:text-lg lg:text-xl font-semibold text-slate-800">
          {pageTitle}
        </h1>
      </div>

      {/* --- Right Section: Actions --- */}
      <div className="flex items-center gap-2 xl:gap-4 shrink-0">
        <button
          type="button"
          className="p-2 bg-secondary/10 hover:bg-secondary/30 transition-all duration-300 rounded-full text-primary relative"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
      </div>

      {/* --- Mobile Sidebar Overlay --- */}
      <div
        className={`fixed inset-0 z-100 transition-all duration-300 ${
          isSidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={closeSidebar}
        />

        {/* Sidebar Panel */}
        <aside
          className={`absolute top-0 left-0 w-80 bg-white h-full border-r border-gray-200 p-6 flex flex-col transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeSidebar}
            className="absolute p-2 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-500 top-4 right-4"
          >
            <X size={18} />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-4 mt-8 mb-10">
            <div className="relative w-14 h-14 shrink-0">
              <Image
                src="/images/user.jpg"
                fill
                alt="Profile"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-lg font-bold text-gray-900 truncate">
                Al Amin Islam
              </h2>
              <p className="text-gray-500 text-sm truncate">admin@gmail.com</p>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="flex-1 flex flex-col gap-2 overflow-y-auto">
            {NAV_LINKS.map(({ name, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeSidebar}
                    className={`group py-3 px-4 rounded-xl text-sm md:text-base flex items-center gap-3 transition-all duration-200 font-medium ${
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-primary"
                          : "text-gray-400 group-hover:text-primary"
                      }
                    />
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logout Button */}
          <button
            type="button"
            className="mt-auto text-white bg-primary hover:bg-primary/90 duration-300 w-full flex items-center justify-between gap-3 rounded-xl py-3 px-5 font-semibold transition-transform active:scale-95"
          >
            Logout
            <HiOutlineLogout className="text-xl" />
          </button>
        </aside>
      </div>
    </nav>
  );
};

export default DashboardNavbar;

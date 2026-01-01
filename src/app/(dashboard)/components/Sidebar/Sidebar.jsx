"use client";

import {
  Users,
  FileText,
  IdCard,
  Smartphone,
  Settings,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
const sidelinks = [
  {
    name: "Dashboard",
    icon: <LayoutGrid />,
    href: "/dashboard",
    match: (pathname) =>
      pathname === "/dashboard" || /^\/dashboard\/\d+$/.test(pathname),
  },
  {
    name: "Tutor Verification",
    icon: <IdCard />,
    href: "/dashboard/tutor_verify",
    match: (pathname) => pathname.startsWith("/dashboard/tutor_verify"),
  },
  {
    name: "User Management",
    icon: <Users />,
    href: "/dashboard/users_manage",
    match: (pathname) => pathname.startsWith("/dashboard/users_manage"),
  },
  {
    name: "Review Management",
    icon: <FileText />,
    href: "/dashboard/review_manage",
    match: (pathname) => pathname.startsWith("/dashboard/review_manage"),
  },
  {
    name: "Support Management",
    icon: <Smartphone />,
    href: "/dashboard/support_manage",
    match: (pathname) => pathname.startsWith("/dashboard/support_manage"),
  },
  {
    name: "System Settings",
    icon: <Settings />,
    href: "/dashboard/system_settings",
    match: (pathname) => pathname.startsWith("/dashboard/system_settings"),
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="lg:w-65 xl:w-72 border-r border-gray-300 h-screen flex justify-between flex-col fixed left-0 top-0 p-6">
      <div>
        <div className="flex items-center gap-4 mt-6 mb-12">
          <Image
            src="/images/user.jpg"
            height={400}
            width={600}
            alt="user image"
            className="w-14 rounded-lg aspect-square object-cover"
          />
          <div className="flex flex-col gap-1">
            <h2 className="md:text-lg font-bold text-black">Al Amin Islam</h2>
            <p className="text-gray text-sm md:text-base">admin@gmail.com</p>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {sidelinks.map((link) => {
            const active = link.match(pathname);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`py-3 px-5 rounded-xl text-sm md:text-base w-full flex items-center gap-2 transition-all duration-200 hover:scale-102 font-medium ${
                    active
                      ? "shadow-[-4px_0px_4px_0px_#8DB0FF40,4px_0px_4px_0px_#8DB0FF40] text-primary"
                      : "text-gray hover:shadow-[-4px_0px_4px_0px_#8DB0FF40,4px_0px_4px_0px_#8DB0FF40] hover:text-primary"
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button className="text-white bg-primary duration-300 w-full flex items-center justify-between gap-3 rounded-xl py-3 px-5 font-semibold transition-all hover:scale-102">
        Logout
        <HiOutlineLogout className="text-xl" />
      </button>
    </div>
  );
};

export default Sidebar;

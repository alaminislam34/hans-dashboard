"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiBarChartSquare } from "react-icons/bi";
import { GrUserSettings } from "react-icons/gr";
import { HiUsers } from "react-icons/hi2";
import { TbReportAnalytics } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";

export const links = [
  {
    name: "Dashboard Overview",
    icon: <BiBarChartSquare />,
    href: "/dashboard",
  },
  {
    name: "Profile Generator",
    icon: <GrUserSettings />,
    href: "/dashboard/user_settings",
  },
  {
    name: "User management",
    icon: <HiUsers />,
    href: "/dashboard/user_management",
  },
  {
    name: "Payment Report",
    icon: <TbReportAnalytics />,
    href: "/dashboard/payment_report",
  },
  {
    name: "Settings",
    icon: <IoSettings />,
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <div className="w-11/12 mx-auto h-[90vh] bg-linear-to-r from-[#FB665B] via-[#CE51A6] to-[#8951D5] p-10 rounded-2xl sticky top-5 flex flex-col justify-between">
      <div>
        <Image
          src={"/icons/logo2.png"}
          height={78}
          width={107}
          alt="Website logo icon"
        />
        <br />
        <br />
        <ul className="space-y-1 ">
          {links.map(({ name, icon, href }, i) => (
            <li key={i}>
              <Link
                className={`py-2 lg:py-3 px-4 rounded-2xl ${
                  path === href ? "bg-white text-secondary2" : " text-white"
                } hover:bg-white hover:text-secondary2 flex items-center duration-300 gap-2`}
                href={href}
              >
                {icon} {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex items-start gap-3">
          <Image
            src={"/logos/logo.jpg"}
            height={60}
            width={60}
            alt="User image"
            className="rounded-full w-15 h-15 bg-cover bg-center border-2 border-white"
          />
          <h3 className="lg:text-xl font-semibold text-white py-2">alamin</h3>
        </div>
        <br />
        <button className="text-lg font-semibold text-secondary2 flex items-center justify-center gap-2 py-3 w-full bg-white rounded-2xl cursor-pointer">
          <FiLogOut /> Log out
        </button>
      </div>
    </div>
  );
}

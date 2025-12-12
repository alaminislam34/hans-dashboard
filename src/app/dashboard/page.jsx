"use client";

import React from "react";
import UserGrowthChart from "./components/Chart/Chart";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div>
      <div className="border p-6 md:p-8 rounded-2xl">
        <h1 className="text-[#1D1B20] font-semibold text-2xl lg:text-[40px] mb-6">
          Overview
        </h1>
        <p className="text-subTypo text-xs md:text-sm">
          Activities summary at a glance.
        </p>
        <div className="flex flex-wrap items-center gap-6 w-full">
          <div className="p-4 flex flex-col items-center rounded-2xl border border-secondary flex-1 space-y-4">
            <div className="flex items-center">
              <Image
                src={"/logos/Capa_1.png"}
                height={800}
                width={800}
                alt="Icons"
                className="w-24 object-cover bg-cover h-auto"
              />
            </div>
            <h4 className="text-[20px] font-medium">Total Parent User</h4>
            <h1 className="text-[32px] font-medium">254</h1>
          </div>
          <div className="p-4 flex flex-col items-center rounded-2xl border border-secondary flex-1 space-y-4">
            <div className="flex items-center">
              <Image
                src={"/logos/teacher.png"}
                height={800}
                width={800}
                alt="Icons"
                className="w-24 object-cover bg-cover h-auto"
              />
            </div>
            <h4 className="text-[20px] font-medium">Total Parent User</h4>
            <h1 className="text-[32px] font-medium">254</h1>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h1 className="text-[#1D1B20] font-semibold text-2xl lg:text-4xl mb-6">
            Analytics Overview
          </h1>
          <UserGrowthChart totalUsers={254} />
        </div>
      </div>
    </div>
  );
}

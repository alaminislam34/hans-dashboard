"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Image from "next/image";
import { USERS_API } from "@/api/ApiEndPoint";
const parentimg = "/images/parents.png";
const teacherimg = "/images/teacher.png";

const Stats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const res = await axiosInstance.get(USERS_API);
      return res.data.results || [];
    },
  });

  const stats = useMemo(() => {
    if (!data) return { parents: 0, tutors: 0 };
    return {
      parents: data.filter((u) => u.user_type === "parent").length,
      tutors: data.filter((u) => u.user_type === "tutor").length,
    };
  }, [data]);

  if (isError)
    return <div className="p-4 text-red-500">Failed to load statistics.</div>;

  return (
    <div className="rounded-2xl shadow-sm p-6 space-y-4 border border-[#E5EDFF] bg-white">
      <div className="space-y-2">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-dark">
          Overview
        </h1>
        <p className="text-gray text-sm md:text-base">
          Activities summary at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <StatCard
          label="Total Parent Users"
          count={stats.parents}
          isLoading={isLoading}
          bgColor="bg-[#B3E59F]/10"
          circleColor="bg-green-100"
          imageSrc={parentimg}
        />

        <StatCard
          label="Total Tutor Users"
          count={stats.tutors}
          isLoading={isLoading}
          bgColor="bg-[#F4D493]/10"
          circleColor="bg-yellow-100"
          imageSrc={teacherimg}
        />
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  count,
  isLoading,
  bgColor,
  circleColor,
  imageSrc,
}) => (
  <div
    className={`rounded-xl ${bgColor} p-6 flex flex-col items-center justify-center gap-2 relative min-h-40 overflow-hidden`}
  >
    <div
      className={`${circleColor} absolute -top-10 -right-10 w-40 h-40 opacity-30 rounded-full z-0`}
    ></div>

    <div className="relative z-10 flex flex-col items-center gap-2">
      <div className="w-16 h-16 relative">
        <Image
          src={imageSrc}
          alt={label}
          width={200}
          height={200}
          unoptimized
          className="object-contain"
          sizes="64px"
          priority={false}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <p className="text-gray-600 text-sm md:text-base font-medium text-center leading-tight">
        {label}
      </p>

      {isLoading ? (
        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <h1 className="text-2xl md:text-3xl font-bold text-dark">
          {count?.toLocaleString() || 0}
        </h1>
      )}
    </div>
  </div>
);

export default Stats;

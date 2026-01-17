"use client";

import React, { useState } from "react";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import DataTable from "../components/CommonTable";
import ReviewDetailModal from "./components/ReviewModal";

const ReviewManage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews-list"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/reviews/");
      return res.data?.reviews_list || [];
    },
  });

  const handleViewDetails = (row) => {
    setSelectedReview(row);
    setShowModal(true);
  };

  const filteredData = reviews.filter((item) =>
    activeTab === "All" ? true : item.status === activeTab
  );

  const columns = [
    {
      header: "Parent Name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-100">
            <Image
              src="/images/user.jpg"
              alt="avatar"
              unoptimized
              fill
              className="object-cover"
            />
          </div>
          <span className="text-gray-600 font-medium">{row.parent_name}</span>
        </div>
      ),
    },
    {
      header: "Tutor Name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-100">
            <Image
              src="/images/user.jpg"
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-gray-600 font-medium">{row.tutor_name}</span>
        </div>
      ),
    },
    {
      header: "Given Rating",
      render: (row) => (
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-gray-600">{row.rating}</span>
        </div>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
            row.status === "Approved"
              ? "bg-[#E7F8F0] text-[#00B69B]"
              : row.status === "Rejected"
              ? "bg-[#FFF0F0] text-[#F93333]"
              : "bg-[#FFF7E6] text-[#FFA70B]"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Action",
      align: "center",
      render: (row) => (
        <button
          onClick={() => handleViewDetails(row)}
          className="text-[#3BA6E7] hover:scale-110 transition-all"
        >
          <Eye size={20} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-xl font-bold text-[#202224]">Reviews Management</h1>
        <div className="flex gap-6 text-sm font-medium text-gray">
          {["All", "Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 transition-all ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-dark"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[15px] shadow-sm overflow-hidden border border-gray-100">
        <DataTable
          columns={columns}
          data={filteredData}
          loading={isLoading}
          emptyMessage={`No ${activeTab} reviews found.`}
        />
      </div>

      {showModal && (
        <ReviewDetailModal
          close={() => setShowModal(false)}
          review={selectedReview}
          refresh={refetch}
        />
      )}
    </div>
  );
};

export default ReviewManage;

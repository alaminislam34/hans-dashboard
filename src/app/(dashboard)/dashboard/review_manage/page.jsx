"use client";

const reviewsData = [
  {
    id: 1,
    parent_name: "Rahim Ahmed",
    tutor_name: "Arif Hossain",
    rating: 5,
    review: "Excellent tutor. Very patient and explains concepts clearly.",
    status: "approved",
  },
  {
    id: 2,
    parent_name: "Karim Uddin",
    tutor_name: "Nusrat Jahan",
    rating: 4,
    review: "My child improved a lot. Classes were well organized.",
    status: "approved",
  },
  {
    id: 3,
    parent_name: "Salma Begum",
    tutor_name: "Imran Khan",
    rating: 5,
    review: "Highly professional and very friendly with students.",
    status: "approved",
  },
  {
    id: 4,
    parent_name: "Hasan Ali",
    tutor_name: "Sadia Islam",
    rating: 3,
    review: "Teaching was good but timing was sometimes irregular.",
    status: "pending",
  },
  {
    id: 5,
    parent_name: "Mizanur Rahman",
    tutor_name: "Tanvir Ahmed",
    rating: 4,
    review: "Good tutor with strong subject knowledge.",
    status: "approved",
  },
  {
    id: 6,
    parent_name: "Faruk Hossain",
    tutor_name: "Mehedi Hasan",
    rating: 2,
    review: "Communication could be better. Not fully satisfied.",
    status: "rejected",
  },
  {
    id: 7,
    parent_name: "Shahid Islam",
    tutor_name: "Ayesha Akter",
    rating: 5,
    review: "Very caring and attentive. My child loves the classes.",
    status: "approved",
  },
  {
    id: 8,
    parent_name: "Rubel Mia",
    tutor_name: "Sabbir Rahman",
    rating: 4,
    review: "Explains topics in an easy way. Recommended.",
    status: "approved",
  },
  {
    id: 9,
    parent_name: "Anwar Hossain",
    tutor_name: "Rima Sultana",
    rating: 3,
    review: "Average experience. Teaching style is okay.",
    status: "pending",
  },
  {
    id: 10,
    parent_name: "Jahid Hasan",
    tutor_name: "Shakil Ahmed",
    rating: 5,
    review: "Outstanding teaching and great discipline.",
    status: "approved",
  },
  {
    id: 11,
    parent_name: "Kamrul Islam",
    tutor_name: "Farhana Yasmin",
    rating: 4,
    review: "Very professional and punctual.",
    status: "approved",
  },
  {
    id: 12,
    parent_name: "Bashir Uddin",
    tutor_name: "Rakib Hossain",
    rating: 2,
    review: "Needs improvement in explaining difficult topics.",
    status: "rejected",
  },
  {
    id: 13,
    parent_name: "Azad Hossain",
    tutor_name: "Naimur Rahman",
    rating: 5,
    review: "Excellent tutor. Strongly recommended.",
    status: "approved",
  },
  {
    id: 14,
    parent_name: "Sajid Khan",
    tutor_name: "Jannatul Ferdous",
    rating: 4,
    review: "Friendly behavior and good teaching skills.",
    status: "approved",
  },
  {
    id: 15,
    parent_name: "Mahbub Alam",
    tutor_name: "Kamrul Islam",
    rating: 3,
    review: "Decent tutor but could be more engaging.",
    status: "pending",
  },
  {
    id: 16,
    parent_name: "Nurul Amin",
    tutor_name: "Sumi Akter",
    rating: 5,
    review: "Very supportive and dedicated tutor.",
    status: "approved",
  },
  {
    id: 17,
    parent_name: "Delwar Hossain",
    tutor_name: "Omar Faruk",
    rating: 4,
    review: "Good teaching but sometimes classes run late.",
    status: "approved",
  },
  {
    id: 18,
    parent_name: "Rafiqul Islam",
    tutor_name: "Tahmina Rahman",
    rating: 5,
    review: "Amazing tutor with great teaching methods.",
    status: "approved",
  },
  {
    id: 19,
    parent_name: "Sultan Ahmed",
    tutor_name: "Ashiqur Rahman",
    rating: 3,
    review: "Teaching is fine but needs better communication.",
    status: "pending",
  },
  {
    id: 20,
    parent_name: "Habibur Rahman",
    tutor_name: "Lubna Chowdhury",
    rating: 5,
    review: "Highly qualified and very professional tutor.",
    status: "approved",
  },
];

import React, { useState } from "react";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import DataTable from "../components/CommonTable";

const ReviewManage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredData = reviewsData.filter((item) =>
    activeTab === "all" ? true : item.status === activeTab
  );

  const columns = [
    {
      header: "Parent Name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-100">
            <Image
              src={`/images/user.jpg`}
              alt="avatar"
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
              src={`/images/user.jpg`}
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
            row.status === "approved"
              ? "bg-[#E7F8F0] text-[#00B69B]"
              : row.status === "rejected"
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
        <button className="text-[#3BA6E7] hover:scale-110 transition-all">
          <Eye size={20} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-xl font-bold text-[#202224]">Select options</h1>

          <div className="flex gap-6 text-sm font-medium text-gray">
            {["all", "pending", "approved", "rejected"].map((tab) => (
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
            emptyMessage={`No ${activeTab} reviews found.`}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewManage;

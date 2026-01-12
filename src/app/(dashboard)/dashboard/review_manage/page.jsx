"use client";

const reviewsData = [
  {
    id: 1,
    parent_name: "Rahim Ahmed",
    tutor_name: "Arif Hossain",
    rating: 5,
    review: "Excellent tutor. Very patient and explains concepts clearly.",
    status: "Approved",
  },
  {
    id: 2,
    parent_name: "Karim Uddin",
    tutor_name: "Nusrat Jahan",
    rating: 4,
    review: "My child improved a lot. Classes were well organized.",
    status: "Approved",
  },
  {
    id: 3,
    parent_name: "Salma Begum",
    tutor_name: "Imran Khan",
    rating: 5,
    review: "Highly professional and very friendly with students.",
    status: "Approved",
  },
  {
    id: 4,
    parent_name: "Hasan Ali",
    tutor_name: "Sadia Islam",
    rating: 3,
    review: "Teaching was good but timing was sometimes irregular.",
    status: "Pending",
  },
  {
    id: 5,
    parent_name: "Mizanur Rahman",
    tutor_name: "Tanvir Ahmed",
    rating: 4,
    review: "Good tutor with strong subject knowledge.",
    status: "Approved",
  },
  {
    id: 6,
    parent_name: "Faruk Hossain",
    tutor_name: "Mehedi Hasan",
    rating: 2,
    review: "Communication could be better. Not fully satisfied.",
    status: "Rejected",
  },
  {
    id: 7,
    parent_name: "Shahid Islam",
    tutor_name: "Ayesha Akter",
    rating: 5,
    review: "Very caring and attentive. My child loves the classes.",
    status: "Approved",
  },
  {
    id: 8,
    parent_name: "Rubel Mia",
    tutor_name: "Sabbir Rahman",
    rating: 4,
    review: "Explains topics in an easy way. Recommended.",
    status: "Approved",
  },
  {
    id: 9,
    parent_name: "Anwar Hossain",
    tutor_name: "Rima Sultana",
    rating: 3,
    review: "Average experience. Teaching style is okay.",
    status: "Pending",
  },
  {
    id: 10,
    parent_name: "Jahid Hasan",
    tutor_name: "Shakil Ahmed",
    rating: 5,
    review: "Outstanding teaching and great discipline.",
    status: "Approved",
  },
  {
    id: 11,
    parent_name: "Kamrul Islam",
    tutor_name: "Farhana Yasmin",
    rating: 4,
    review: "Very professional and punctual.",
    status: "Approved",
  },
  {
    id: 12,
    parent_name: "Bashir Uddin",
    tutor_name: "Rakib Hossain",
    rating: 2,
    review: "Needs improvement in explaining difficult topics.",
    status: "Rejected",
  },
  {
    id: 13,
    parent_name: "Azad Hossain",
    tutor_name: "Naimur Rahman",
    rating: 5,
    review: "Excellent tutor. Strongly recommended.",
    status: "Approved",
  },
  {
    id: 14,
    parent_name: "Sajid Khan",
    tutor_name: "Jannatul Ferdous",
    rating: 4,
    review: "Friendly behavior and good teaching skills.",
    status: "Approved",
  },
  {
    id: 15,
    parent_name: "Mahbub Alam",
    tutor_name: "Kamrul Islam",
    rating: 3,
    review: "Decent tutor but could be more engaging.",
    status: "Pending",
  },
  {
    id: 16,
    parent_name: "Nurul Amin",
    tutor_name: "Sumi Akter",
    rating: 5,
    review: "Very supportive and dedicated tutor.",
    status: "Approved",
  },
  {
    id: 17,
    parent_name: "Delwar Hossain",
    tutor_name: "Omar Faruk",
    rating: 4,
    review: "Good teaching but sometimes classes run late.",
    status: "Approved",
  },
  {
    id: 18,
    parent_name: "Rafiqul Islam",
    tutor_name: "Tahmina Rahman",
    rating: 5,
    review: "Amazing tutor with great teaching methods.",
    status: "Approved",
  },
  {
    id: 19,
    parent_name: "Sultan Ahmed",
    tutor_name: "Ashiqur Rahman",
    rating: 3,
    review: "Teaching is fine but needs better communication.",
    status: "Pending",
  },
  {
    id: 20,
    parent_name: "Habibur Rahman",
    tutor_name: "Lubna Chowdhury",
    rating: 5,
    review: "Highly qualified and very professional tutor.",
    status: "Approved",
  },
];

import React, { useState } from "react";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import DataTable from "../components/CommonTable";
import ReviewDetailModal from "./components/ReviewModal";

const ReviewManage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleViewDetails = (row) => {
    setSelectedReview(row);
    setShowModal(true);
  };

  const filteredData = reviewsData.filter((item) =>
    activeTab === "All" ? true : item.status === activeTab
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
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-xl font-bold text-[#202224]">Select options</h1>

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
            emptyMessage={`No ${activeTab} reviews found.`}
          />
        </div>
      </div>
      {showModal && (
        <ReviewDetailModal
          close={() => setShowModal(false)}
          review={selectedReview}
        />
      )}
    </div>
  );
};

export default ReviewManage;

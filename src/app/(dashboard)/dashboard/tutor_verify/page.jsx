"use client";

import React, { useState } from "react";
import { Eye } from "lucide-react";
import DataTable from "../components/CommonTable";
import UserInfoModal from "./components/ActionModal";

const tutorsData = [
  { id: 1, name: "Abir Hossain", email: "abid32@gmail.com", status: "Pending" },

  {
    id: 2,

    name: "Maksud Bhuiya",

    email: "user123@example.com",

    status: "Approved",
  },

  {
    id: 3,

    name: "Arjun Patel",

    email: "hello@creativeoutlook.com",

    status: "Rejected",
  },

  {
    id: 4,

    name: "Sita Sharma",

    email: "info@innovativeideas.com",

    status: "Pending",
  },

  {
    id: 5,

    name: "Kiran Mehta",

    email: "support@techsolutions.com",

    status: "Approved",
  },

  {
    id: 6,

    name: "Ravi Kumar",

    email: "contact@brightfuture.com",

    status: "Rejected",
  },

  {
    id: 7,

    name: "Anita Desai",

    email: "admin@yourdomain.com",

    status: "Pending",
  },

  {
    id: 8,

    name: "Deepak Verma",

    email: "reachus@smartsolutions.com",

    status: "Approved",
  },
];

const TutorManage = () => {
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const filteredTutors = tutorsData.filter((tutor) =>
    filter === "All" ? true : tutor.status === filter
  );

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-pendingBG text-pendingText";
      case "Approved":
        return "bg-approvedBG text-approvedText";
      case "Rejected":
        return "bg-rejectBG text-rejectText";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    {
      header: "User Name",
      render: (tutor) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
            <img
              src={`https://ui-avatars.com/api/?name=${tutor.name}&background=random`}
              alt={tutor.name}
            />
          </div>
          <span className="font-medium text-dark whitespace-nowrap">
            {tutor.name}
          </span>
        </div>
      ),
    },
    {
      header: "Email",
      render: (tutor) => (
        <a
          href={`mailto:${tutor.email}`}
          className="text-secondary hover:underline underline-offset-4"
        >
          {tutor.email}
        </a>
      ),
    },
    {
      header: "Status",
      render: (tutor) => (
        <span
          className={`px-4 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
            tutor.status
          )}`}
        >
          {tutor.status}
        </span>
      ),
    },
    {
      header: "Action",
      align: "center",
      render: (tutor) => (
        <button
          onClick={() => handleViewDetails(tutor)} // ২. Puron tutor object pathano hocche
          className="text-secondary hover:scale-110 transition-transform inline-block"
        >
          <Eye size={20} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
        <h1 className="text-xl font-bold text-dark">Select options</h1>
        <div className="flex gap-6 text-sm font-medium text-gray">
          {["All", "Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pb-1 transition-all ${
                filter === tab
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
          data={filteredTutors}
          emptyMessage="No tutors found in this category."
        />
      </div>

      {/* ৩. Modal-e data pathano hocche props hishebe */}
      {showModal && (
        <UserInfoModal setShowModal={setShowModal} userData={selectedUser} />
      )}
    </div>
  );
};

export default TutorManage;

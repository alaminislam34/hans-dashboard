"use client";

import React, { useState } from "react";
import { Eye, ChevronDown } from "lucide-react";
import DataTable from "../components/CommonTable";
import ParentBanModal from "./components/ParentModal";
import TutorBanModal from "./components/TutorModal";
const usersData = [
  {
    user_name: "Arif Hossain",
    email: "arif.hossain@demo.com",
    location: "Dhaka",
    phone: "01830000001",
    age: 28,
    user_type: "tutor",
    teaching_time: "Evening (5 PM - 9 PM)",
    certificate: "B.Ed",
    education_level: "BSc in Mathematics",
  },
  {
    user_name: "Nusrat Jahan",
    email: "nusrat.jahan@demo.com",
    location: "Narayanganj",
    phone: "01830000002",
    age: 26,
    user_type: "tutor",
    teaching_time: "Morning (8 AM - 12 PM)",
    certificate: "TESOL",
    education_level: "BA in English",
  },
  {
    user_name: "Imran Khan",
    email: "imran.khan@demo.com",
    location: "Khulna",
    phone: "01830000003",
    age: 30,
    user_type: "tutor",
    teaching_time: "Full Time",
    certificate: "B.Ed",
    education_level: "MSc in Physics",
  },
  {
    user_name: "Sadia Islam",
    email: "sadia.islam@demo.com",
    location: "Barishal",
    phone: "01830000004",
    age: 27,
    user_type: "tutor",
    teaching_time: "Evening (6 PM - 10 PM)",
    certificate: "Primary Teaching Certificate",
    education_level: "BSS",
  },
  {
    user_name: "Tanvir Ahmed",
    email: "tanvir.ahmed@demo.com",
    location: "Cumilla",
    phone: "01830000005",
    age: 29,
    user_type: "tutor",
    teaching_time: "Afternoon (2 PM - 6 PM)",
    certificate: "B.Ed",
    education_level: "BSc in Chemistry",
  },
  {
    user_name: "Ayesha Akter",
    email: "ayesha.akter@demo.com",
    location: "Mymensingh",
    phone: "01830000006",
    age: 25,
    user_type: "tutor",
    teaching_time: "Morning (9 AM - 1 PM)",
    certificate: "Montessori Training",
    education_level: "BA in Education",
  },
  {
    user_name: "Mehedi Hasan",
    email: "mehedi.hasan@demo.com",
    location: "Jashore",
    phone: "01830000007",
    age: 32,
    user_type: "tutor",
    teaching_time: "Evening (5 PM - 8 PM)",
    certificate: "B.Ed",
    education_level: "MSc in Biology",
  },
  {
    user_name: "Sabbir Rahman",
    email: "sabbir.rahman@demo.com",
    location: "Bogura",
    phone: "01830000008",
    age: 31,
    user_type: "tutor",
    teaching_time: "Full Time",
    certificate: "ICT Teaching Certificate",
    education_level: "BSc in Computer Science",
  },
  {
    user_name: "Rima Sultana",
    email: "rima.sultana@demo.com",
    location: "Rangpur",
    phone: "01830000009",
    age: 27,
    user_type: "tutor",
    teaching_time: "Evening (6 PM - 9 PM)",
    certificate: "B.Ed",
    education_level: "BA in Bangla",
  },
  {
    user_name: "Shakil Ahmed",
    email: "shakil.ahmed@demo.com",
    location: "Gazipur",
    phone: "01830000010",
    age: 34,
    user_type: "tutor",
    teaching_time: "Weekend Only",
    certificate: "Higher Math Training",
    education_level: "MSc in Mathematics",
  },
  {
    user_name: "Farhana Yasmin",
    email: "farhana.yasmin@demo.com",
    location: "Sylhet",
    phone: "01830000011",
    age: 29,
    user_type: "tutor",
    teaching_time: "Morning (8 AM - 11 AM)",
    certificate: "TESOL",
    education_level: "MA in English",
  },
  {
    user_name: "Rakib Hossain",
    email: "rakib.hossain@demo.com",
    location: "Dhaka",
    phone: "01830000012",
    age: 24,
    user_type: "tutor",
    teaching_time: "Evening (7 PM - 10 PM)",
    certificate: "Online Teaching Certificate",
    education_level: "BBA",
  },
  {
    user_name: "Naimur Rahman",
    email: "naimur.rahman@demo.com",
    location: "Tangail",
    phone: "01830000013",
    age: 35,
    user_type: "tutor",
    teaching_time: "Full Time",
    certificate: "B.Ed",
    education_level: "MA in History",
  },
  {
    user_name: "Jannatul Ferdous",
    email: "jannatul.ferdous@demo.com",
    location: "Feni",
    phone: "01830000014",
    age: 26,
    user_type: "tutor",
    teaching_time: "Afternoon (3 PM - 7 PM)",
    certificate: "Primary Teacher Training",
    education_level: "BA",
  },
  {
    user_name: "Kamrul Islam",
    email: "kamrul.islam@demo.com",
    location: "Noakhali",
    phone: "01830000015",
    age: 33,
    user_type: "tutor",
    teaching_time: "Evening (5 PM - 9 PM)",
    certificate: "B.Ed",
    education_level: "MSc in Accounting",
  },
  {
    user_name: "Sumi Akter",
    email: "sumi.akter@demo.com",
    location: "Pabna",
    phone: "01830000016",
    age: 28,
    user_type: "tutor",
    teaching_time: "Morning (9 AM - 12 PM)",
    certificate: "Montessori Training",
    education_level: "BSS",
  },
  {
    user_name: "Omar Faruk",
    email: "omar.faruk@demo.com",
    location: "Cox's Bazar",
    phone: "01830000017",
    age: 36,
    user_type: "tutor",
    teaching_time: "Weekend Only",
    certificate: "Science Teaching Certificate",
    education_level: "MSc in Chemistry",
  },
  {
    user_name: "Tahmina Rahman",
    email: "tahmina.rahman@demo.com",
    location: "Dinajpur",
    phone: "01830000018",
    age: 31,
    user_type: "tutor",
    teaching_time: "Evening (6 PM - 10 PM)",
    certificate: "B.Ed",
    education_level: "MA in Sociology",
  },
  {
    user_name: "Ashiqur Rahman",
    email: "ashiqur.rahman@demo.com",
    location: "Narsingdi",
    phone: "01830000019",
    age: 27,
    user_type: "tutor",
    teaching_time: "Afternoon (1 PM - 5 PM)",
    certificate: "ICT Teaching Certificate",
    education_level: "BSc in Software Engineering",
  },
  {
    user_name: "Lubna Chowdhury",
    email: "lubna.chowdhury@demo.com",
    location: "Chattogram",
    phone: "01830000020",
    age: 34,
    user_type: "tutor",
    teaching_time: "Full Time",
    certificate: "Cambridge Teaching Certificate",
    education_level: "MA in English Literature",
  },
  {
    user_name: "Rahim Ahmed",
    student_name: "Arif Ahmed",
    email: "rahim.ahmed@demo.com",
    location: "Dhaka",
    phone: "01740000001",
    age: 42,
    user_type: "parent",
  },
  {
    user_name: "Karim Uddin",
    student_name: "Sadia Karim",
    email: "karim.uddin@demo.com",
    location: "Chattogram",
    phone: "01740000002",
    age: 45,
    user_type: "parent",
  },
  {
    user_name: "Salma Begum",
    student_name: "Rima Akter",
    email: "salma.begum@demo.com",
    location: "Gazipur",
    phone: "01740000003",
    age: 38,
    user_type: "parent",
  },
  {
    user_name: "Hasan Ali",
    student_name: "Nafis Hasan",
    email: "hasan.ali@demo.com",
    location: "Sylhet",
    phone: "01740000004",
    age: 40,
    user_type: "parent",
  },
  {
    user_name: "Mizanur Rahman",
    student_name: "Fahim Rahman",
    email: "mizanur.rahman@demo.com",
    location: "Rajshahi",
    phone: "01740000005",
    age: 47,
    user_type: "parent",
  },
  {
    user_name: "Faruk Hossain",
    student_name: "Tanvir Hossain",
    email: "faruk.hossain@demo.com",
    location: "Bogura",
    phone: "01740000006",
    age: 44,
    user_type: "parent",
  },
  {
    user_name: "Shahid Islam",
    student_name: "Nusrat Islam",
    email: "shahid.islam@demo.com",
    location: "Rangpur",
    phone: "01740000007",
    age: 41,
    user_type: "parent",
  },
  {
    user_name: "Rubel Mia",
    student_name: "Mim Mia",
    email: "rubel.mia@demo.com",
    location: "Kishoreganj",
    phone: "01740000008",
    age: 39,
    user_type: "parent",
  },
  {
    user_name: "Anwar Hossain",
    student_name: "Mehedi Hossain",
    email: "anwar.hossain@demo.com",
    location: "Gazipur",
    phone: "01740000009",
    age: 46,
    user_type: "parent",
  },
  {
    user_name: "Jahid Hasan",
    student_name: "Samiul Hasan",
    email: "jahid.hasan@demo.com",
    location: "Mymensingh",
    phone: "01740000010",
    age: 43,
    user_type: "parent",
  },
  {
    user_name: "Kamrul Islam",
    student_name: "Adnan Islam",
    email: "kamrul.islam@demo.com",
    location: "Tangail",
    phone: "01740000011",
    age: 48,
    user_type: "parent",
  },
  {
    user_name: "Bashir Uddin",
    student_name: "Nabila Bashir",
    email: "bashir.uddin@demo.com",
    location: "Pabna",
    phone: "01740000012",
    age: 50,
    user_type: "parent",
  },
  {
    user_name: "Azad Hossain",
    student_name: "Shanto Hossain",
    email: "azad.hossain@demo.com",
    location: "Jashore",
    phone: "01740000013",
    age: 45,
    user_type: "parent",
  },
  {
    user_name: "Sajid Khan",
    student_name: "Irfan Khan",
    email: "sajid.khan@demo.com",
    location: "Cox's Bazar",
    phone: "01740000014",
    age: 41,
    user_type: "parent",
  },
  {
    user_name: "Mahbub Alam",
    student_name: "Sourav Alam",
    email: "mahbub.alam@demo.com",
    location: "Dinajpur",
    phone: "01740000015",
    age: 49,
    user_type: "parent",
  },
  {
    user_name: "Nurul Amin",
    student_name: "Rashed Amin",
    email: "nurul.amin@demo.com",
    location: "Feni",
    phone: "01740000016",
    age: 44,
    user_type: "parent",
  },
  {
    user_name: "Delwar Hossain",
    student_name: "Shihab Hossain",
    email: "delwar.hossain@demo.com",
    location: "Noakhali",
    phone: "01740000017",
    age: 46,
    user_type: "parent",
  },
  {
    user_name: "Rafiqul Islam",
    student_name: "Tanim Islam",
    email: "rafiqul.islam@demo.com",
    location: "Narsingdi",
    phone: "01740000018",
    age: 43,
    user_type: "parent",
  },
  {
    user_name: "Sultan Ahmed",
    student_name: "Rayan Ahmed",
    email: "sultan.ahmed@demo.com",
    location: "Munshiganj",
    phone: "01740000019",
    age: 40,
    user_type: "parent",
  },
  {
    user_name: "Habibur Rahman",
    student_name: "Nayeem Rahman",
    email: "habibur.rahman@demo.com",
    location: "Brahmanbaria",
    phone: "01740000020",
    age: 52,
    user_type: "parent",
  },
];

const UsersManage = () => {
  const [activeTab, setActiveTab] = useState("parent");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTutorModal, setShowTutorModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);

  // Status Filter State (All, Banned, Active)
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter Logic based on Tab and Status
  const filteredData = usersData.filter((user) => {
    const matchesTab = user.user_type === activeTab;

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "banned"
        ? user.is_banned === true
        : user.is_banned !== true;

    return matchesTab && matchesStatus;
  });

  const handleAction = (user) => {
    setSelectedUser(user);
    if (user.user_type === "tutor") {
      setShowTutorModal(true);
    } else {
      setShowParentModal(true);
    }
  };

  const commonColumns = [
    { header: "User Name", key: "user_name" },
    { header: "Email", key: "email" },
    ...(activeTab === "parent"
      ? [{ header: "Student Name", key: "student_name" }]
      : []),

    {
      header: "Action",
      align: "center",
      render: (row) => (
        <button
          onClick={() => handleAction(row)}
          className="text-primary hover:scale-110 transition-all"
        >
          <Eye size={20} />
        </button>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-0">
      {/* Selection Header & Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-8">
          <h1 className="text-lg font-semibold whitespace-nowrap">
            Select Users:
          </h1>
          <div className="flex flex-row gap-6 items-center">
            <button
              onClick={() => setActiveTab("parent")}
              className="font-medium group flex items-center gap-2"
            >
              <span
                className={`w-3.5 h-3.5 ring-2 group-hover:scale-110 duration-300 rounded-full ${
                  activeTab === "parent"
                    ? "bg-primary ring-primary"
                    : "ring-gray-300"
                }`}
              ></span>
              Parents
            </button>
            <button
              onClick={() => setActiveTab("tutor")}
              className="font-medium group flex items-center gap-2"
            >
              <span
                className={`w-3.5 h-3.5 ring-2 group-hover:scale-110 duration-300 rounded-full ${
                  activeTab === "tutor"
                    ? "bg-primary ring-primary"
                    : "ring-gray-300"
                }`}
              ></span>
              Tutors
            </button>
          </div>
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative min-w-40">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none pl-5 pr-10 py-2.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer text-gray-600 font-medium text-sm transition-all shadow-sm"
          >
            <option value="all">All Status</option>
            <option value="unbanned">Active</option>
            <option value="banned">Banned</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          columns={commonColumns}
          data={filteredData}
          emptyMessage={`No ${
            statusFilter === "all" ? "" : statusFilter
          } ${activeTab}s found.`}
        />
      </div>

      {/* Modals */}
      {showTutorModal && (
        <TutorBanModal
          user={selectedUser}
          close={() => setShowTutorModal(false)}
        />
      )}
      {showParentModal && (
        <ParentBanModal
          user={selectedUser}
          close={() => setShowParentModal(false)}
        />
      )}
    </div>
  );
};

export default UsersManage;

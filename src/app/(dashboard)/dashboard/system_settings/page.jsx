"use client";

import React, { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline as UnderlineExtension } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Placeholder } from "@tiptap/extension-placeholder";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/api/axiosInstance";
import { UPDATE_PROFILE_API } from "@/api/ApiEndPoint";
import Cookies from "js-cookie";

import {
  User,
  Phone,
  MapPin,
  ImageIcon,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Image as ImageIcon2,
  List,
  ListOrdered,
  AlignCenter,
  Trash2,
  Camera,
  Loader2,
} from "lucide-react";
import { useGlobalState } from "@/app/providers/StateProvider";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="p-4 md:p-0">
      <div className="flex justify-end gap-4 md:gap-8 mb-6 text-sm font-medium border-b border-gray-100 pb-4">
        {["personal", "terms", "privacy"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize transition-all duration-300 ${
              activeTab === tab
                ? "text-blue-600 underline decoration-2 underline-offset-8"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab === "personal"
              ? "Personal Information"
              : tab === "terms"
                ? "Terms & Conditions"
                : "Privacy Policy"}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl md:rounded-4xl p-6 md:p-10 shadow-sm min-h-150 transition-all">
        {activeTab === "personal" && <PersonalInfoForm />}
        {(activeTab === "terms" || activeTab === "privacy") && (
          <EditorSection key={activeTab} />
        )}
      </div>
    </div>
  );
};

const PersonalInfoForm = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const { user, setUser } = useGlobalState();
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    email: user?.email,
    full_name: "",
    phone_number: "",
    address: "",
    profile_picture: null,
  });

  const { isLoading: isFetching } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get(UPDATE_PROFILE_API);
      const data = res.data;
      setFormData({
        full_name: data.full_name || "",
        phone_number: data.phone_number || "",
        address: data.address || "",
        profile_picture: null,
      });
      if (data.profile_picture) setPreviewImage(data.profile_picture);
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const data = new FormData();
      data.append("full_name", updatedData.full_name);
      data.append("phone_number", updatedData.phone_number);
      data.append("address", updatedData.address);

      if (updatedData.profile_picture instanceof File) {
        data.append("profile_picture", updatedData.profile_picture);
      }

      const response = await axiosInstance.patch(UPDATE_PROFILE_API, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["my-profile"]);

      const updatedUser = {
        name: data.full_name,
        email: data.email,
        image: data.profile_picture,
        address: data.address,
        phone: data.phone_number,
      };

      Cookies.set("admin", JSON.stringify(updatedUser), {
        expires: 7,
        path: "/",
      });

      setUser(updatedUser);

      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update profile.";
      toast.error(errorMessage);
    },
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_picture: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isFetching)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <form
      onSubmit={handleUpdate}
      className="flex flex-col items-center max-w-2xl mx-auto py-4"
    >
      {/* Image Upload Section */}
      <div className="mb-6 text-center group flex flex-col justify-center items-center">
        <div
          onClick={() => fileInputRef.current.click()}
          className="relative w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-gray-200 rounded-[35%] flex items-center justify-center bg-gray-50 cursor-pointer transition-all hover:border-blue-400 overflow-hidden"
        >
          {previewImage ? (
            <>
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            </>
          ) : (
            <ImageIcon className="text-gray-300" size={40} />
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />
        <p className="mt-4 text-gray-800 font-bold text-lg">
          Upload your photo
        </p>
      </div>

      <div className="w-full space-y-4 mb-6">
        <InputWithIcon
          icon={<User size={20} />}
          placeholder="full_name"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
        />
        <InputWithIcon
          icon={<Phone size={20} />}
          placeholder="Contact number"
          value={formData.phone_number}
          onChange={(e) =>
            setFormData({ ...formData, phone_number: e.target.value })
          }
        />
        <InputWithIcon
          icon={<MapPin size={20} />}
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-gray-400 flex justify-center items-center gap-2"
      >
        {mutation.isPending && <Loader2 className="animate-spin" size={20} />}
        Update Changes
      </button>
    </form>
  );
};

const InputWithIcon = ({ icon, placeholder, value, onChange }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </div>
    <input
      required
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full py-3.5 pl-13 pr-4 bg-[#F9FAFB] rounded-2xl border border-transparent focus:border-blue-200 focus:bg-white outline-none transition-all"
    />
  </div>
);

// EditorSection remains the same as provided previously...
const EditorSection = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      TextStyle,
      Color,
      TiptapImage,
      Placeholder.configure({ placeholder: "Write your content here..." }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { class: "text-blue-600 underline cursor-pointer" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onUpdate: ({ editor }) => setHtmlContent(editor.getHTML()),
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border border-gray-100 rounded-3xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-50 bg-white shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 p-3 bg-[#FBFBFF] border-b border-gray-100">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            icon={<Bold size={18} />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            icon={<Italic size={18} />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            icon={<Underline size={18} />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            icon={<Strikethrough size={18} />}
          />
          <div className="h-6 w-px bg-gray-200 mx-1" />
          <input
            type="color"
            onInput={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
            className="w-7 h-7 p-0.5 border border-gray-200 rounded-md cursor-pointer bg-white"
            value={editor.getAttributes("textStyle").color || "#000000"}
          />
          <div className="h-6 w-px bg-gray-200 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            icon={<List size={18} />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            icon={<ListOrdered size={18} />}
          />
          <div className="h-6 w-px bg-gray-200 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            icon={<AlignCenter size={18} />}
          />
          <ToolbarButton
            onClick={() => editor.commands.setContent("")}
            icon={<Trash2 size={18} className="text-red-400" />}
          />
        </div>
        <EditorContent
          editor={editor}
          className="tiptap-editor min-h-87.5 p-6 focus:outline-none"
        />
      </div>
      <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
        Update Content
      </button>
    </div>
  );
};

const ToolbarButton = ({ icon, onClick, active }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2.5 rounded-xl transition-all duration-200 ${active ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50"}`}
  >
    {icon}
  </button>
);

export default SystemSettings;

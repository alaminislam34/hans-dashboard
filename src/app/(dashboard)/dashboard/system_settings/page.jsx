"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline as UnderlineExtension } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Placeholder } from "@tiptap/extension-placeholder";

import {
  User,
  Phone,
  MapPin,
  ImageIcon,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link2,
  Image as ImageIcon2,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Type,
  Quote,
  Trash2,
} from "lucide-react";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
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
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setHtmlContent(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      setHtmlContent(editor.getHTML());
    }
  }, [editor]);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    // If clicking button while cursor is on a link, remove it
    if (editor.isActive("link")) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    const url = window.prompt("Enter URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Set link and move cursor out of it automatically
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border border-gray-100 rounded-3xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-50 transition-all bg-white shadow-xs">
        {/* Toolbar */}
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
            onClick={setLink}
            active={editor.isActive("link")}
            icon={<Link2 size={18} />}
          />
          <ToolbarButton onClick={addImage} icon={<ImageIcon2 size={18} />} />

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
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            icon={<AlignLeft size={18} />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            icon={<AlignCenter size={18} />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            icon={<AlignRight size={18} />}
          />

          <div className="h-6 w-px bg-gray-200 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            icon={<Quote size={18} />}
          />
          <ToolbarButton
            onClick={() => editor.commands.setContent("")}
            icon={<Trash2 size={18} className="text-red-400" />}
          />
        </div>

        <div className="bg-white">
          <EditorContent
            editor={editor}
            className="tiptap-editor min-h-87.5 p-6 focus:outline-none"
          />
        </div>
      </div>

      <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
        Update Content
      </button>

      {/* Preview Section */}
      <div className="mt-12 bg-[#F8FAFF] rounded-3xl p-8 border border-blue-50">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-600 rounded-full" />
          Preview update content:
        </h3>
        {!htmlContent || htmlContent === "<p></p>" ? (
          <p className="text-gray-400 italic text-center py-10">
            No content to preview yet...
          </p>
        ) : (
          <div
            className="tiptap-preview prose prose-blue max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
      </div>

      <style jsx global>{`
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #cbd5e1;
          pointer-events: none;
          height: 0;
        }
        .tiptap-editor .tiptap:focus {
          outline: none;
        }
        .tiptap ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .tiptap ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        .tiptap blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          color: #475569;
          font-style: italic;
          background: #f1f5f9;
          padding-block: 0.5rem;
        }
        .tiptap img {
          max-width: 100%;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

const ToolbarButton = ({ icon, onClick, active }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2.5 rounded-xl transition-all duration-200 ${
      active
        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
        : "bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50"
    }`}
  >
    {icon}
  </button>
);

const PersonalInfoForm = () => (
  <div className="flex flex-col items-center max-w-2xl mx-auto py-4">
    <div className="mb-12 text-center group">
      <div className="w-32 h-32 md:w-44 md:h-44 border-2 border-dashed border-gray-200 rounded-[40px] flex items-center justify-center bg-gray-50 cursor-pointer transition-all">
        <ImageIcon className="text-gray-300" size={48} />
      </div>
      <p className="mt-6 text-gray-800 font-bold text-lg md:text-2xl">
        Upload your photo
      </p>
    </div>
    <div className="w-full space-y-5 mb-12">
      <InputWithIcon icon={<User size={20} />} placeholder="Full Name" />
      <InputWithIcon icon={<Phone size={20} />} placeholder="Contact number" />
      <InputWithIcon icon={<MapPin size={20} />} placeholder="Location" />
    </div>
    <button className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl">
      Update Changes
    </button>
  </div>
);

const InputWithIcon = ({ icon, placeholder }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </div>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full py-4.5 pl-13 pr-4 bg-[#F9FAFB] rounded-2xl border border-transparent focus:border-blue-200 focus:bg-white outline-none"
    />
  </div>
);

export default SystemSettings;

"use client";

import React, { useState } from "react";
import {
  Home,
  Hash,
  Heart,
  ChevronDown,
  ChevronUp,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  User,
} from "lucide-react";

/* =========================
   MENU DATA
========================= */

const menuSections = [
  {
    title: "MAIN MENU",
    links: [
      { name: "Home Page", icon: Home, isActive: true },
      { name: "Trending Topics", icon: Hash },
      { name: "Popular Creator", icon: Heart },
    ],
    defaultOpen: true,
  },
];

/* =========================
   CONTACTS DATA (mock)
========================= */

const contacts = [
  { name: "Anya", img: "https://i.pravatar.cc/40?img=12", online: true },
  { name: "Riya", img: "https://i.pravatar.cc/40?img=22", online: true },
  { name: "Kabir", img: "https://i.pravatar.cc/40?img=32", online: false },
  { name: "Dev", img: "https://i.pravatar.cc/40?img=42", online: true },
];

/* =========================
   MENU ITEM
========================= */

const MenuItem = ({ icon: Icon, name, isActive = false, collapsed }: any) => (
  <div
    className={`
      flex items-center
      ${collapsed ? "justify-center" : ""}
      p-3 my-0.5 rounded-lg cursor-pointer text-sm transition-all
      ${
        isActive
          ? "bg-[#151515] text-white border border-orange-500/20 shadow-md"
          : "text-gray-400 hover:text-white hover:bg-[#151515]"
      }
    `}
  >
    <Icon className="w-5 h-5 shrink-0" />
    {!collapsed && <span className="ml-3">{name}</span>}
  </div>
);

/* =========================
   CONTACT ITEM
========================= */

const ContactItem = ({ contact, collapsed }: any) => (
  <div
    className={`
      flex items-center gap-3
      p-2 rounded-lg cursor-pointer
      hover:bg-[#151515]
      ${collapsed ? "justify-center" : ""}
    `}
  >
    <div className="relative">
      <img
        src={contact.img}
        className="w-8 h-8 rounded-full object-cover"
      />

      {contact.online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-black" />
      )}
    </div>

    {!collapsed && (
      <span className="text-sm text-gray-300">{contact.name}</span>
    )}
  </div>
);

/* =========================
   MENU SECTION
========================= */

const MenuSection = ({ section, collapsed }: any) => {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true);

  return (
    <div className="mb-6">
      {!collapsed && (
        <div
          className="flex justify-between text-xs text-gray-500 uppercase cursor-pointer mb-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {section.title}
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      )}

      {(isOpen || collapsed) &&
        section.links.map((link: any) => (
          <MenuItem key={link.name} {...link} collapsed={collapsed} />
        ))}
    </div>
  );
};

/* =========================
   SIDEBAR
========================= */

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        className="fixed top-4 left-4 bg-black/50 backdrop-blur-md p-2 rounded-lg md:hidden z-[9999]"
        onClick={() => setOpen(true)}
      >
        <Menu className="text-white w-6 h-6" />
      </button>

      <aside
        className={`
        md:relative fixed h-screen
        ${collapsed ? "w-20" : "w-64"}
        p-4 z-[9999]
        transition-all duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static
      `}
      >
        {/* Background */}
        <div className="absolute inset-0 backdrop-blur-xl border-r border-white/5 bg-gradient-to-b from-black/70 via-[#0c0c0c]/90 to-[#0a0a0a]" />

        {/* Orange glow */}
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-orange-500/20 blur-[140px]" />

        <div className="relative flex flex-col h-full text-white">

          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-6 p-2 hover:bg-white/10 rounded-lg self-end"
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>

          {/* MAIN MENU */}
          <div className="flex-grow overflow-y-auto pr-1">

            {menuSections.map((section) => (
              <MenuSection
                key={section.title}
                section={section}
                collapsed={collapsed}
              />
            ))}

            {/* MY CONTACTS */}
            <div className="mt-6">
              {!collapsed && (
                <p className="text-xs text-gray-500 uppercase mb-3">
                  My Contacts
                </p>
              )}

              <div className="space-y-1">
                {contacts.map((c) => (
                  <ContactItem
                    key={c.name}
                    contact={c}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

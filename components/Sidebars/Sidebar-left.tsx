"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Hash,
  Heart,
  ChevronDown,
  ChevronUp,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

/* =========================
   MENU DATA
========================= */

const menuSections = [
  {
    title: "MAIN MENU",
    links: [
      { name: "Home Page", icon: Home, path: "/" },
      { name: "Trending Topics", icon: Hash, path: "/trending" },
      { name: "Popular Creator", icon: Heart, path: "/creators" },
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
   TYPES (IMPORTANT FOR TS BUILD)
========================= */

interface MenuItemProps {
  icon: any;
  name: string;
  isActive?: boolean;
  collapsed: boolean;
  onClick: () => void;
}

interface ContactItemProps {
  contact: {
    name: string;
    img: string;
    online: boolean;
  };
  collapsed: boolean;
}

interface MenuSectionProps {
  section: any;
  collapsed: boolean;
  currentPath: string;
  onNavigate: (path: string) => void;
}

/* =========================
   MENU ITEM
========================= */

const MenuItem = ({
  icon: Icon,
  name,
  isActive = false,
  collapsed,
  onClick,
}: MenuItemProps) => (
  <div
    onClick={onClick}
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

const ContactItem = ({ contact, collapsed }: ContactItemProps) => (
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
        alt={contact.name}
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

const MenuSection = ({
  section,
  collapsed,
  currentPath,
  onNavigate,
}: MenuSectionProps) => {
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
          <MenuItem
            key={link.name}
            icon={link.icon}
            name={link.name}
            isActive={currentPath === link.path}
            collapsed={collapsed}
            onClick={() => onNavigate(link.path)}
          />
        ))}
    </div>
  );
};

/* =========================
   SIDEBAR (FIXED)
========================= */

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        className="fixed top-4 left-4 bg-black/50 backdrop-blur-md p-2 rounded-lg md:hidden z-[9999]"
        onClick={() => setOpen(true)}
      >
        <Menu className="text-white w-6 h-6" />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

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
        <div className="absolute inset-0 backdrop-blur-xl border-r border-white/5 bg-gradient-to-b from-black/70 via-[#0c0c0c]/90 to-[#0a0a0a]" />

        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-orange-500/20 blur-[140px]" />

        <div className="relative flex flex-col h-full text-white">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-6 p-2 hover:bg-white/10 rounded-lg self-end"
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>

          <div className="flex-grow overflow-y-auto pr-1">
            {menuSections.map((section) => (
              <MenuSection
                key={section.title}
                section={section}
                collapsed={collapsed}
                currentPath={pathname}
                onNavigate={handleNavigation}
              />
            ))}

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

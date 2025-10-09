"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IAdminSidebarLink, ImageRegistry } from "@/constants";
import { useAuthStore } from "@/services";
import { SidebarIcon } from "@/design-system";

interface IAdminSidebarProps {
  adminSidebarLinks: IAdminSidebarLink[];
  isVisibleSidebar: boolean;
  toggleSidebar: () => void;
}

export function AdminSidebar({
  adminSidebarLinks,
  isVisibleSidebar,
  toggleSidebar,
}: IAdminSidebarProps) {
  const pathName = usePathname();
  const router = useRouter();
  const { removeSession } = useAuthStore();

  // Function to handle navigation
  const handleRedirect = (link: string) => {
    if (link === "/admin/logout") {
      handleLogout();
    } else {
      router.push(link);
    }
  };

  // Logout function
  const handleLogout = () => {
    removeSession();
    router.push("/login"); // Redirect to login page
  };

  return (
    <aside className="flex flex-col items-center w-full h-full bg-white overflow-hidden">
      <div className="w-full flex items-center justify-between p-4">
        <div>
          <div className={`w-[8rem] ${isVisibleSidebar ? "hidden" : "flex"}`}>
            <Image
              src={ImageRegistry.websiteLogo}
              alt="website-logo"
              className="w-full h-full cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
          <div className={`w-12 ${isVisibleSidebar ? "flex" : "hidden"}`}>
            <Image
              src={ImageRegistry.websiteLogo}
              alt="website-logo"
              className="w-full h-full cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
        </div>
        <div
          className={`absolute ${
            isVisibleSidebar ? "-right-1" : "right-4"
          } w-6 h-6 cursor-pointer`}
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </div>
      </div>

      <ul className="flex flex-col gap-4 overflow-scroll admin-sidebar-links-container w-full">
        {adminSidebarLinks.map((link, index) => {
          const isActive = pathName === link.path;
          return (
            <div
              key={index}
              className="flex items-center justify-between w-full"
            >
              <li className="relative group w-[95%] pl-4">
                <button
                  onClick={() => handleRedirect(link.path)}
                  className={`flex items-center gap-3 px-4 py-3  rounded-lg 2xl:rounded-[0.5vw] transition w-full text-left ${
                    isActive ? "bg-secondary text-primary" : null
                  }`}
                >
                  <span className="w-6 h-6">
                    {isActive ? link.activeIcon : link.icon}
                  </span>
                  <span
                    className={`${isVisibleSidebar ? "hidden" : "flex"} ${
                      isActive ? "text-primary font-medium" : " text-gray-600"
                    } `}
                  >
                    {link.name}
                  </span>
                </button>

                {/* Tooltip (Visible only when hovering over icon) */}
                {isVisibleSidebar && (
                  <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
                    {link.name}
                  </span>
                )}
              </li>
              {isActive ? (
                <div className="w-[0.5rem] rounded-sm h-full bg-primary"></div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </aside>
  );
}

"use client";
import React, { JSX, useState } from "react";
import { AdminHeader, AdminSidebar } from "@/components";
import { IAdminSidebarLayoutProps } from "@/constants";

/**
 * AdminSidebarLayout component renders a responsive admin layout with a taggable sidebar.
 *
 * @component
 * @param {IAdminSidebarLayoutProps} props - The component props.
 * @param {JSX.Element} props.children - The main content to be displayed.
 * @param {IAdminSidebarLink[]} props.adminSidebarLinks - Array of sidebar navigation links.
 * @returns {JSX.Element} The rendered AdminSidebarLayout component.
 */
export function AdminSidebarLayout({
  children,
  adminSidebarLinks,
}: IAdminSidebarLayoutProps): JSX.Element {
  const [isVisibleSidebar, SetIsVisibleSidebar] = useState(false);

  /**
   * Toggles the visibility of the sidebar.
   */
  const toggleSidebar = () => {
    SetIsVisibleSidebar((prev) => !prev);
  };

  return (
    <div className="w-full flex justify-end h-screen ">
      {/* Sidebar */}
      <div
        className={`${
          isVisibleSidebar ? "w-0 xl:w-[6rem]" : "w-[70%] md:w-[20rem]"
        } h-full z-40 transition-all duration-500 ease-in-out  bg-white shadow-md fixed left-0`}
      >
        <AdminSidebar
          adminSidebarLinks={adminSidebarLinks}
          isVisibleSidebar={isVisibleSidebar}
          toggleSidebar={toggleSidebar}
        />
      </div>
      {/* Main Content */}
      <div
        className={`${
          isVisibleSidebar
            ? "w-full xl:w-[calc(100%-6rem)]"
            : "w-[30%] md:w-[calc(100%-20rem)]"
        } transition-all duration-500 ease-in-out`}
      >
        <AdminHeader />
        <div className="p-4 sm:p-6 md:p-8 overflow-auto min-h-[91.5vh]">
          {children}
        </div>
      </div>
    </div>
  );
}

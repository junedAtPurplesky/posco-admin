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
          isVisibleSidebar ? "w-0 xl:w-[6%]" : "w-[70%] md:w-[35%] lg:w-[25%] xl:w-[20%]"
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
          isVisibleSidebar ? "w-full xl:w-[94%]" : "w-[30%] md:w-[65%] lg:w-[75%] xl:w-[80%]"
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

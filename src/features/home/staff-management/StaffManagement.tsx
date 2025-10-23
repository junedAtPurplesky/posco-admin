"use client";

import { useState } from "react";
import { AddStaffModal } from "./component";
import {  Table } from "@/components";
import { staffListActions, staffListColumns } from "@/constants";
// import { PlusIcons } from "@/features";
import { useAllStaffQuery } from "@/services/apis";
import { PlusIcon } from "@/features/icons";

export function StaffManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText] = useState("");

  // Fetch staff list from API
  const { allStaffData, isLoading, isError, error } = useAllStaffQuery({
    searchText,
    page: 1,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <section className="flex flex-col gap-4 bg-white p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:gap-0 gap-3">
        <h1 className="text-[1.2rem] font-normal text-gray-800">Staff List</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* <SearchBar onSearch={(text) => setSearchText(text)} /> */}
          <button
            className="flex gap-1 items-center cursor-pointer"
            onClick={handleOpenModal}
          >
            <PlusIcon className="w-4 h-4" />
            <span className="text-primary">Add Staff</span>
          </button>
          {/* <button className="flex gap-1 items-center cursor-pointer">
            <FilterIcon className="w-4 h-4" />
            <span className="text-primary">Filter</span>
          </button> */}
        </div>
      </div>

      {/* Staff Table with API data */}
      {isLoading ? (
        <p className="text-gray-500">Loading staff list...</p>
      ) : isError ? (
        <p className="text-red-500">
          Error: {error?.message || "Failed to load staff list."}
        </p>
      ) : (
        <Table
          columns={staffListColumns}
          data={allStaffData?.data || []}
          actions={staffListActions}
        />
      )}

      {/* Add Staff Modal */}
      <AddStaffModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}

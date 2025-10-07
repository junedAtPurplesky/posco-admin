"use client";
import { SearchBar, Table } from "@/components";
import {
  dummyStaffList,
  staffListActions,
  staffListColumns,
} from "@/constants";
import { PlusIcon, FilterIcon } from "@/features/icons";

export function StaffManagement() {
  return (
    <section className="flex flex-col gap-4 bg-white  p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:gap-0 gap-3">
        <h1 className="text-[1.2rem]">Staff List</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <SearchBar onSearch={() => {}} />
          <button className="flex gap-1 items-center cursor-pointer">
            <PlusIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-[#0B7AB5]">Add Staff </h1>
          </button>
          <button className="flex gap-1 items-center cursor-pointer">
            <FilterIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-[#0B7AB5]">Filter </h1>
          </button>{" "}
        </div>
      </div>
      <Table
        columns={staffListColumns}
        data={dummyStaffList}
        actions={staffListActions}
      />
    </section>
  );
}

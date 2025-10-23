"use client";
import { Table } from "@/components";
import {
  // submittedFormsListActions,
  submittedFormsListColumns,
  // submittedFormsListActions,
} from "@/constants";

// import { FilterIcon, CalenderIcon } from "@/features";
import { useAllSubmissionQuery } from "@/services/apis";

export function SubmittedForms() {
  const { allSubmissionData, isLoading, isError } = useAllSubmissionQuery();

  return (
    <section className="flex flex-col gap-4 bg-white p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-0 gap-3">
        <h1 className="text-[1.2rem]">Submitted Forms List</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* <SearchBar onSearch={() => {}} /> */}
          {/* <button className="flex gap-1 items-center cursor-pointer">
            <CalenderIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-primary">View By Date</h1>
          </button>
          <button className="flex gap-1 items-center cursor-pointer">
            <FilterIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-primary">Filter</h1>
          </button> */}
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="text-red-500">Failed to load data.</div>
      ) : allSubmissionData?.data ? (
        <Table
          columns={submittedFormsListColumns}
          data={allSubmissionData?.data}
          // actions={submittedFormsListActions}
        />
      ) : (
        <div className="text-gray-500 text-center p-4 text-sm">
          No submissions found.
        </div>
      )}
    </section>
  );
}

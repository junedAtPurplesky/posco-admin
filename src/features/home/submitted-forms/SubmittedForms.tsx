"use client";
import { SearchBar, Table } from "@/components";
import {
  submittedFormsListColumns,
  submittedFormsListActions,
} from "@/constants";
import { ISubmittedFormsListProps } from "@/constants";

import { FilterIcon, CalenderIcon } from "@/features";
import {
  IAllSubmissionsResponse,
  useAllSubmissionQuery,
} from "@/services/apis";

export function SubmittedForms() {
  const {
    allSubmissionData,
    isLoading,
    isError,
  }: {
    allSubmissionData: IAllSubmissionsResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  } = useAllSubmissionQuery();

  // Map API data
  const mappedData: ISubmittedFormsListProps[] =
    allSubmissionData?.data.map((item, index) => ({
      id: index + 1,
      staffName: item.staff_ids[0] || "Unknown",
      submissionDate: item.due_date,
      department: "worker",
      complianceScore: Math.floor(Math.random() * 100).toString(),
      department_id: item.department_id,
      staff_ids: item.staff_ids,
      due_date: item.due_date,
    })) || [];

  return (
    <section className="flex flex-col gap-4 bg-white p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-0 gap-3">
        <h1 className="text-[1.2rem]">Submitted Forms List</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <SearchBar onSearch={() => {}} />
          <button className="flex gap-1 items-center cursor-pointer">
            <CalenderIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-primary">View By Date</h1>
          </button>
          <button className="flex gap-1 items-center cursor-pointer">
            <FilterIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-primary">Filter</h1>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="text-red-500">Failed to load data.</div>
      ) : mappedData.length > 0 ? (
        <Table
          columns={submittedFormsListColumns}
          data={mappedData}
          actions={submittedFormsListActions}
        />
      ) : (
        <div className="text-gray-500 text-center p-4 text-sm">
          No submissions found.
        </div>
      )}
    </section>
  );
}

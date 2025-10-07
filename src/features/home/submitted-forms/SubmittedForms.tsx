"use client";
import { SearchBar, Table } from "@/components";
import {
  submittedFormsListColumns,
  dummySubmittedFormsList,
  submittedFormsListActions,
} from "@/constants";

import { FilterIcon, CalenderIcon } from "@/features";

export function SubmittedForms() {
  return (
    <section className="flex flex-col gap-4 bg-white  p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-0 gap-3">
        <h1 className="text-[1.2rem]">Submitted Forms List</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <SearchBar onSearch={() => {}} />
          <button className="flex gap-1 items-center cursor-pointer">
            <CalenderIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-primary">View By Date </h1>
          </button>
          <button className="flex gap-1 items-center cursor-pointer">
            <FilterIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-primary">Filter </h1>
          </button>
        </div>
      </div>
      <Table
        columns={submittedFormsListColumns}
        data={dummySubmittedFormsList}
        actions={submittedFormsListActions}
      />
    </section>
  );
}

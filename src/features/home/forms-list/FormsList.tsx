"use client";

import { useState } from "react";
import { SearchBar, Table } from "@/components";
import {
  formsListColumns,
  formsListActions,
} from "@/constants";
import { FilterIcon, PlusIcon } from "@/features/icons";
import { AddFormModal } from "./component";
import toast from "react-hot-toast";
import { IDeleteFormResponse, useAllFormsQuery, useDeleteFormMutation } from "@/services/apis";
import { IApiError } from "@/utils";
import { IFormsListProps, mapFormToTableRow } from "@/constants/table-list/forms-list";

export function FormsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all forms
  const { allFormsData, refetchForms } = useAllFormsQuery();

  // Delete form mutation
  const { onDeleteFormMutate } = useDeleteFormMutation({
    onSuccessCallback: (data: IDeleteFormResponse) => {
      toast.success(data.message)
      refetchForms(); // refresh table after delete
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message)
    },
  });

  // Map backend data to table rows
  const tableData: IFormsListProps[] =
    allFormsData?.data.map(mapFormToTableRow) || [];

  // Update actions to call delete mutation
  const updatedActions = formsListActions.map((action) => {
    if (action.label === "Delete") {
      return {
        ...action,
        onClick: (row: IFormsListProps) => {
            onDeleteFormMutate(row?.id);
        },
      };
    }
    return action;
  });

  return (
    <section className="flex flex-col gap-4 bg-white p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:gap-0 gap-3">
        <h1 className="text-[1.2rem]">Form List</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <SearchBar onSearch={() => {}} />
          <button
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-primary">Add Form</h1>
          </button>
          <button className="flex gap-1 items-center cursor-pointer">
            <FilterIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-primary">Filter</h1>
          </button>
        </div>
      </div>

      <Table
        columns={formsListColumns}
        data={tableData}
        actions={updatedActions}
      />

      {/* Modal */}
      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          refetchForms(); // refresh table after adding form
        }}
      />
    </section>
  );
}

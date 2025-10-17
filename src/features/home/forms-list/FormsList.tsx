"use client";

import { useState } from "react";
import { SearchBar, Table } from "@/components";
import {
  formsListColumns,
  ITableAction,
} from "@/constants";
import { PlusIcon } from "@/features/icons";
import { AddFormModal, AssignFormModal } from "./component";
import toast from "react-hot-toast";
import {
  IDeleteFormResponse,
  useAllFormsQuery,
  useDeleteFormMutation,
} from "@/services/apis";
import { IApiError } from "@/utils";
import {
  IFormsListProps,
  mapFormToTableRow,
} from "@/constants/table-list/forms-list";

export function FormsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [formId, setFormId] = useState("");

  // Fetch all forms
  const { allFormsData, refetchForms } = useAllFormsQuery();

  // Delete form mutation
  const { onDeleteFormMutate } = useDeleteFormMutation({
    onSuccessCallback: (data: IDeleteFormResponse) => {
      toast.success(data.message);
      refetchForms(); // refresh table after delete
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  // Map backend data to table rows
  const tableData: IFormsListProps[] =
    allFormsData?.data.map(mapFormToTableRow) || [];

  // Table actions
  const formsListActions: ITableAction<IFormsListProps>[] = [
    {
      label: "View",
      onClick: (row) => console.log("View form:", row),
    },
    {
      label: "Assign Form",
      onClick: (row) => {
        setFormId(row?.id)
        setIsAssignModalOpen(true);
      },
    },
    {
      label: "Delete",
      onClick: (row) => {
        onDeleteFormMutate(row?.id);
      },
      className: "text-red-500 hover:text-red-700",
    },
  ];

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
          {/* <button className="flex gap-1 items-center cursor-pointer">
            <FilterIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-primary">Filter</h1>
          </button> */}
        </div>
      </div>

      <Table
        columns={formsListColumns}
        data={tableData}
        actions={formsListActions}
      />

      {/* Add Form Modal */}
      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          refetchForms(); // refresh table after adding form
        }}
      />

      {/* Assign Form Modal */}
      <AssignFormModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)} formId={formId} />
    </section>
  );
}
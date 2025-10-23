"use client";

import { useState } from "react";
import { Table } from "@/components";
import { formsListColumns, ITableAction } from "@/constants";
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
import { ConfirmationModal } from "@/components/confirmation-modal";

export function FormsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [formId, setFormId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { allFormsData, refetchForms } = useAllFormsQuery();

  const { onDeleteFormMutate } = useDeleteFormMutation({
    onSuccessCallback: (data: IDeleteFormResponse) => {
      toast.success(data.message);
      refetchForms();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const tableData: IFormsListProps[] =
    allFormsData?.data.map(mapFormToTableRow) || [];

  const formsListActions: ITableAction<IFormsListProps>[] = [
    {
      label: "Assign Form",
      onClick: (row) => {
        setFormId(row?.id);
        setIsAssignModalOpen(true);
      },
    },
    {
      label: "Delete",
      onClick: (row) => {
        setFormId(row?.id);
        setIsDeleteModalOpen(true);
      },
      className: "text-red-500 hover:text-red-700",
    },
  ];

  const handleDeleteConfirm = () => {
    onDeleteFormMutate(formId);
    setIsDeleteModalOpen(false);
  };

  return (
    <section className="flex flex-col gap-4 bg-white p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:gap-0 gap-3">
        <h1 className="text-[1.2rem]">Form List</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <button
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="w-4 h-4 cursor-pointer" />
            <h1 className="text-primary">Add Form</h1>
          </button>
        </div>
      </div>

      <Table
        columns={formsListColumns}
        data={tableData}
        actions={formsListActions}
      />

      <AddFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          refetchForms();
        }}
      />

      <AssignFormModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        formId={formId}
      />

      {/*  Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Form"
        message="Are you sure you want to delete this form? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
      />
    </section>
  );
}

"use client";

import { useState, useCallback } from "react";
import {  ITableColumn } from "../table";
import toast from "react-hot-toast";
import { IAllFormList, IUpdateFormStatusResponse, useUpdateFormStatusMutation } from "@/services/apis";


export interface IFormsListProps {
  id: string;
  formName: string;
  completionRate: string;
  dueDate: string;
  createdAt: string;
  status: string;
}

// Status Toggle Cell Component
function StatusToggleCell({ value, formId }: { value: string; formId: string }) {
  const [currentStatus, setCurrentStatus] = useState(value.toLowerCase());
  const [isLoading, setIsLoading] = useState(false);

  const { updateFormStatusMutate } = useUpdateFormStatusMutation({
    onSuccessCallback: (data: IUpdateFormStatusResponse) => {
      toast.success("Status updated successfully");
      setCurrentStatus(data.data.status); 
      setIsLoading(false);
    },
    onErrorCallback: () => {
      toast.error("Status update failed");
      setCurrentStatus(value.toLowerCase());
      setIsLoading(false);
    },
  });

  const toggleStatus = useCallback(() => {
    if (isLoading) return;

    const newStatus = currentStatus === "active" ? "inactive" : "active";

    // Optimistic UI update
    setCurrentStatus(newStatus);
    setIsLoading(true);

    updateFormStatusMutate({
      id: formId,
      payload: { status: newStatus as "active" | "inactive" },
    });
  }, [currentStatus, formId, isLoading, updateFormStatusMutate]);

  return (
    <button
      onClick={toggleStatus}
      disabled={isLoading}
      className={`w-12 h-6 flex items-center p-1 rounded-full transition-colors duration-200 ${
        currentStatus === "active" ? "bg-blue-500" : "bg-gray-400"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
          currentStatus === "active" ? "translate-x-6" : "translate-x-0"
        } ${isLoading ? "animate-pulse" : ""}`}
      />
    </button>
  );
}

// Map backend data to table props
export const mapFormToTableRow = (form: IAllFormList): IFormsListProps => ({
  id: form.id,
  formName: form.form_name,
  completionRate: "0", 
  dueDate: form.due_date || "-",
  createdAt: form.created_at || "-",
  status: form.status,
});

// Table columns
export const formsListColumns: ITableColumn<IFormsListProps>[] = [
  {
    header: "FORM NAME",
    accessor: "formName",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "COMPLETION RATE",
    accessor: "completionRate",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value }) => <span>{value}%</span>,
  },
  {
    header: "DUE DATE",
    accessor: "dueDate",
    sortable: true,
    headerClassName: "min-w-[12rem]",
        cell: ({ value }) => {
      if (!value) return "N/A";
      const date = new Date(value);
      return <span className="text-gray-800">{date.toDateString()}</span>;
    },
  },
  {
    header: "CREATED AT",
    accessor: "createdAt",
    sortable: true,
    headerClassName: "min-w-[12rem]",
        cell: ({ value }) => {
      if (!value) return "N/A";
      const date = new Date(value);
      return <span className="text-gray-800">{date.toDateString()}</span>;
    },
  },
  {
    header: "STATUS",
    accessor: "status",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value, row }) => <StatusToggleCell value={value} formId={row.id} />,
  },
];


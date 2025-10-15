"use client";

import { useState } from "react";
import { ITableAction, ITableColumn } from "../table";
import { getScoreColor } from "@/utils/helpers/get";
import { formatDate } from "@/utils";
import { IAllFormList } from "@/services/apis";

export interface IFormsListProps {
  id: string;
  formName: string;
  completionRate: string;
  dueDate: string;
  createdAt: string;
  status: string;
}

// Cell component for completion rate
function CompletionRateCell({ value }: { value: string }) {
  const numericRate = parseInt(value) || 0;
  const colorClass = getScoreColor(numericRate);
  return <span className={`px-2 py-1 text-xs ${colorClass}`}>{value}%</span>;
}

// Cell component for status toggle
function StatusToggleCell({ value }: { value: string }) {
  const [isOn, setIsOn] = useState(value === "Active");

  const toggleStatus = () => {
    const newStatus = !isOn ? "Active" : "Inactive";
    setIsOn(!isOn);
    console.log("Status changed to:", newStatus);
    // You can call your API here to update the status
  };

  return (
    <button
      onClick={toggleStatus}
      className={`w-12 h-6 flex items-center p-1 rounded-full transition-colors duration-300 ${
        isOn ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// Map backend data to table props
export const mapFormToTableRow = (form: IAllFormList): IFormsListProps => ({
  id: form.id,
  formName: form.form_name,
  completionRate: "0", // replace with real completion rate if available
  dueDate: form.due_date || "-",
  createdAt: form.created_at || "-", // replace with createdAt field from backend
  status: form.status,
});

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
    cell: ({ value }) => <CompletionRateCell value={value as string} />,
  },
  {
    header: "DUE DATE",
    accessor: "dueDate",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value }) => <span>{formatDate(value as string)}</span>,
  },
  {
    header: "CREATED AT",
    accessor: "createdAt",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value }) => <span>{formatDate(value as string)}</span>,
  },
  {
    header: "STATUS",
    accessor: "status",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value }) => <StatusToggleCell value={value as string} />,
  },
];

export const formsListActions: ITableAction<IFormsListProps>[] = [
  {
    label: "Delete",
    onClick: (row) => console.log("Delete form submission:", row),
    className: "text-red-500 hover:text-red-700",
  },
];

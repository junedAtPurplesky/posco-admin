"use client";
import { useState } from "react";
import { ITableAction, ITableColumn } from "../table";
import { getScoreColor } from "@/utils/helpers/get";

export interface IFormsListProps {
  id: number;
  formName: string;
  completionRate: string;
  dueDate: string;
  createdAt: string;
  status: string;
}

// Cell component for completion rate
function CompletionRateCell({ value }: { value: string }) {
  const numericRate = parseInt(value);
  const colorClass = getScoreColor(numericRate);
  return <span className={`px-2 py-1  text-xs ${colorClass}`}>{value}%</span>;
}

// Cell component for status toggle
function StatusToggleCell({ value }: { value: string }) {
  const [isOn, setIsOn] = useState(value === "Active");

  const toggleStatus = () => {
    const newStatus = !isOn ? "Active" : "Inactive";
    setIsOn(!isOn);
    console.log("Status changed to:", newStatus);
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
    headerClassName: "min-w-[12rem] ",
    cell: ({ value }) => <CompletionRateCell value={value as string} />,
  },
  {
    header: "DUE DATE",
    accessor: "dueDate",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "CREATED AT",
    accessor: "createdAt",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "STATUS",
    accessor: "status",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value }) => <StatusToggleCell value={value as string} />,
  },
];

export const dummyFormsList: IFormsListProps[] = [
  {
    id: 1,
    formName: "John Smith",
    completionRate: "92",
    dueDate: "2024-01-15",
    createdAt: "2024-01-01",
    status: "Pending",
  },
  {
    id: 2,
    formName: "Sarah Johnson",
    completionRate: "88",
    dueDate: "2024-01-15",
    createdAt: "2024-01-02",
    status: "Active",
  },
];

export const formsListActions: ITableAction<IFormsListProps>[] = [
  {
    label: "Edit",
    onClick: (row) => {
      console.log("Edit form submission:", row);
    },
  },
  {
    label: "View Form",
    onClick: (row) => {
      console.log("View form submission:", row);
    },
  },
  {
    label: "Staff List",
    onClick: (row) => {
      console.log("Staff List form:", row);
    },
  },
  {
    label: "Delete",
    onClick: (row) => {
      console.log("Delete form submission:", row);
    },
    className: "text-red-500 hover:text-red-700",
  },
];

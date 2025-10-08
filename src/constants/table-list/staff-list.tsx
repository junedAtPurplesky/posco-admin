"use client";
import { useState } from "react";
import { getDepartmentStyle } from "@/utils/helpers/getDepartmentStyle";
import { ITableAction, ITableColumn } from "../table";

export interface IStaffListProps {
  id: number;
  staffName: string;
  email: string;
  department: string;
  createdAt: string;
  status: string;
}

// 🔹 Department Cell Component
function DepartmentCell({ value }: { value: string }) {
  const styleClass = getDepartmentStyle(value);
  return (
    <span className={`px-3 py-1 rounded-md text-xs border ${styleClass} capitalize`}>
      {value}
    </span>
  );
}

// 🔹 Status Toggle Cell Component
function StatusToggleCell({ value }: { value: string }) {
  const [isOn, setIsOn] = useState(value === "Active");

  const toggleStatus = () => {
    const newStatus = !isOn ? "Active" : "Inactive";
    setIsOn(!isOn);
    console.log("Status changed to:", newStatus);
    // Optional: Add API call or state update logic here
  };

  return (
    <button
      onClick={toggleStatus}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
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

// 🔹 Table Columns
export const staffListColumns: ITableColumn<IStaffListProps>[] = [
  {
    header: "STAFF NAME",
    accessor: "staffName",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "EMAIL",
    accessor: "email",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "DEPARTMENT",
    accessor: "department",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value }) => <DepartmentCell value={value as string} />,
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

// 🔹 Dummy Data
export const dummyStaffList: IStaffListProps[] = [
  {
    id: 1,
    staffName: "John Smith",
    email: "john@gmail.com",
    department: "Worker",
    createdAt: "20-feb-2024",
    status: "Pending",
  },
  {
    id: 2,
    staffName: "John Smith",
    email: "john@gmail.com",
    department: "Quality Control",
    createdAt: "20-feb-2024",
    status: "Pending",
  },
];

// 🔹 Table Actions
export const staffListActions: ITableAction<IStaffListProps>[] = [
  {
    label: "View Form",
    onClick: (row) => {
      console.log("View form submission:", row);
    },
    className: "text-blue-500 hover:text-blue-700",
  },
  {
    label: "View Staff",
    onClick: (row) => {
      console.log("View Staff form:", row);
    },
    className: "text-blue-500 hover:text-blue-700",
  },
];

"use client";
import { useState } from "react";
import { getDepartmentStyle } from "@/utils/helpers/getDepartmentStyle";
import { ITableAction, ITableColumn } from "../table";

export interface IStaffListProps {
  // id: number;
  // staffName: string;
  // email: string;
  // department: string;
  // createdAt: string;
  // status: string;
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  employee_id: string | null;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  profile_picture: string | null;
  status: string;
  dob: string | null;
  otp: string | null;
  otpExpiresAt: string | null;
  isOtpVerified: boolean;
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  department: any;
}

// Department Cell Component
function DepartmentCell({ value }: { value: string }) {
  const styleClass = getDepartmentStyle(value);
  return (
    <span
      className={`px-3 py-1 rounded-md text-xs border ${styleClass} capitalize`}
    >
      {value}
    </span>
  );
}

// Status Toggle Cell Component
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

// Table Columns
export const staffListColumns: ITableColumn<IStaffListProps>[] = [
  {
    header: "STAFF NAME",
    accessor: "first_name",
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
    cell: ({ value }) => {
      const departmentName =
        typeof value === "object" && value !== null
          ? value.name
          : value || "N/A";
      return <DepartmentCell value={departmentName} />;
    },
  },
  {
    header: "CREATED AT",
    accessor: "created_at",
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
    cell: ({ value }) => <StatusToggleCell value={value as string} />,
  },
];

// Table Actions
export const staffListActions: ITableAction<IStaffListProps>[] = [
  {
    label: "View Form",
    onClick: (row) => {
      console.log("View form submission:", row);
    },
  },
  {
    label: "View Staff",
    onClick: (row) => {
      console.log("View Staff form:", row);
    },
  },
];

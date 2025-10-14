"use client";
import { useState, useCallback } from "react";
import { getDepartmentStyle } from "@/utils/helpers/getDepartmentStyle";
import { ITableAction, ITableColumn } from "../table";
import { useUpdateStaffStatusMutation } from "@/services/apis";
import toast from "react-hot-toast";

export interface IStaffListProps {
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

// Status Toggle Cell Component with API Integration
function StatusToggleCell({
  value,
  staffId,
}: {
  value: string;
  staffId: string;
}) {
  const [currentStatus, setCurrentStatus] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const { updateStaffStatusMutate } = useUpdateStaffStatusMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message)
      setIsLoading(false);
      if (data?.data?.status) {
        setCurrentStatus(data.data.status);
      }
    },
    onErrorCallback: (err) => {
      toast.error(err.message)
      setIsLoading(false);
      setCurrentStatus(value);
    },
  });

  const toggleStatus = useCallback(() => {
    if (isLoading) return;

    const newStatus = currentStatus === "active" ? "inactive" : "active";
    console.log("🔄 Toggling status:", {
      staffId,
      from: currentStatus,
      to: newStatus,
    });

    setIsLoading(true);

    // Optimistically update UI
    setCurrentStatus(newStatus);

    updateStaffStatusMutate({
      id: staffId,
      payload: {
        status: newStatus as "active" | "inactive",
      },
    });
  }, [currentStatus, isLoading, staffId, updateStaffStatusMutate]);

  const isActive = currentStatus === "active";

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggleStatus}
        disabled={isLoading}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
          isActive ? "bg-blue-500" : "bg-gray-400"
        } ${
          isLoading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:opacity-90"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
            isActive ? "translate-x-6" : "translate-x-0"
          } ${isLoading ? "animate-pulse" : ""}`}
        />
      </button>
    </div>
  );
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

// Table Columns
export const staffListColumns: ITableColumn<IStaffListProps>[] = [
  {
    header: "STAFF NAME",
    accessor: "first_name",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value, row }) => (
      <span>
        {value} {row.last_name}
      </span>
    ),
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
    cell: ({ value, row }) => (
      <StatusToggleCell value={value as string} staffId={row.id} />
    ),
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

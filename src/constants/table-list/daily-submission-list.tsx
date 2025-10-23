"use client";
import { ISubmission } from "@/services/apis";
import { ITableColumn } from "../table";
import { formatDate } from "@/utils";

// Helper function to get text color based on score
function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-blue-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
}

// Helper function to get department styles
function getDepartmentStyle(department: string): string {
  switch (department) {
    case "maintenance":
    case "worker":
      return "text-green-600 border-green-600";
    case "electrical":
      return "text-blue-600 border-blue-600";
    case "supervisor":
      return "text-yellow-600 border-yellow-600";
    case "quality control":
      return "text-orange-600 border-orange-600";
    default:
      return "text-gray-600 border-gray-400";
  }
}

// Cell component for compliance score
function ComplianceScoreCell({ value }: { value: number }) {
  const colorClass = getScoreColor(value);
  return <span className={`px-2 py-1 text-xs ${colorClass}`}>{value}%</span>;
}

// Cell component for department
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

export const formSubmissionColumns: ITableColumn<ISubmission>[] = [
  {
    header: "STAFF NAME",
    accessor: "staff_name",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "SUBMISSION DATE",
    accessor: "submission_date",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({value}) => <span>{formatDate(value)}</span>
  },
  {
    header: "DEPARTMENT",
    accessor: "department",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value }) => <DepartmentCell value={value as string} />,
  },
  {
    header: "COMPLIANCE SCORE",
    accessor: "compliance_score",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value }) => <ComplianceScoreCell value={Number(value)} />,
  },
];


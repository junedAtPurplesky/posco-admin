"use client";
import { ITableAction, ITableColumn } from "../table";

export interface IFormSubmissionProps {
  id: number;
  staffName: string;
  submissionDate: string;
  department: string;
  complianceScore: number;
}

// Helper function to get text color based on score
function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-blue-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
}

// Helper function to get department styles
function getDepartmentStyle(department: string): string {
  switch (department.toLowerCase()) {
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

export const formSubmissionColumns: ITableColumn<IFormSubmissionProps>[] = [
  {
    header: "STAFF NAME",
    accessor: "staffName",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "SUBMISSION DATE",
    accessor: "submissionDate",
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
    header: "COMPLIANCE SCORE",
    accessor: "complianceScore",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value }) => <ComplianceScoreCell value={value as number} />,
  },
];

// Dummy data
export const dummyFormSubmissions: IFormSubmissionProps[] = [
  {
    id: 1,
    staffName: "John Smith",
    submissionDate: "2024-01-15",
    department: "Maintenance",
    complianceScore: 20,
  },
  {
    id: 2,
    staffName: "Sarah Johnson",
    submissionDate: "2024-01-15",
    department: "Electrical",
    complianceScore: 88,
  },
  {
    id: 3,
    staffName: "Michael Chen",
    submissionDate: "2024-01-15",
    department: "Supervisor",
    complianceScore: 95,
  },
  {
    id: 4,
    staffName: "Emily Davis",
    submissionDate: "2024-01-15",
    department: "Worker",
    complianceScore: 78,
  },
  {
    id: 5,
    staffName: "Robert Wilson",
    submissionDate: "2024-01-14",
    department: "Quality Control",
    complianceScore: 85,
  },
];

// Table actions
export const formSubmissionActions: ITableAction<IFormSubmissionProps>[] = [
  {
    label: "View",
    onClick: (row) => console.log("View form submission:", row),
    className: "hover:text-blue-700",
  },
  {
    label: "Edit",
    onClick: (row) => console.log("Edit form submission:", row),
  },
  {
    label: "Delete",
    onClick: (row) => console.log("Delete form submission:", row),
    className: "text-red-500 hover:text-red-700",
  },
  {
    label: "Download",
    onClick: (row) => console.log("Download form submission:", row),
  },
  {
    label: "Approve",
    onClick: (row) => console.log("Approve form submission:", row),
  },
  {
    label: "Reject",
    onClick: (row) => {
      console.log("Reject form submission:", row);
    },
  },
];

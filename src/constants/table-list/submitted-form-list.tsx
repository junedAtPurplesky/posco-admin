"use client";
import { getDepartmentStyle } from "@/utils/helpers/getDepartmentStyle";
import { ITableAction, ITableColumn } from "../table";
import { getScoreColor } from "@/utils/helpers/get";
import { ISubmission } from "@/services/apis";

export interface ISubmittedFormsListProps {
  id: number;
  staffName: string;
  submissionDate: string;
  department: string;
  complianceScore: string;
  department_id: string;
  staff_ids: string[];
  due_date: string;
}

// Cell component for department
function DepartmentCell({ value }: { value: string }) {
  const styleClass = getDepartmentStyle(value);
  return (
    <span className={`px-3 py-1 rounded-md text-xs border ${styleClass} capitalize`}>
      {value}
    </span>
  );
}

// Cell component for compliance score
function ComplianceScoreCell({ value }: { value: string }) {
  const numericScore = parseInt(value);
  const colorClass = getScoreColor(numericScore);
  return (
    <span className={`px-2 py-1 rounded-md text-xs ${colorClass}`}>
      {value}%
    </span>
  );
}

export const submittedFormsListColumns: ITableColumn<ISubmission>[] = [
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
    cell: ({ value }) => {
      if (!value) return "N/A";
      const date = new Date(value);
      return <span className="text-gray-800">{date.toDateString()}</span>;
    },  },
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
    cell: ({ value }) => <ComplianceScoreCell value={value as string} />,
  },
];

// export const dummySubmittedFormsList: ISubmittedFormsListProps[] = [
//   {
//     id: 1,
//     staffName: "John Smith",
//     submissionDate: "2024-01-15",
//     department: "worker",
//     complianceScore: "92",
//   },
// ];

export const submittedFormsListActions: ITableAction<ISubmission>[] = [
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
    label: "View Staff",
    onClick: (row) => {
      console.log("View Staff List form:", row);
    },
  },
];
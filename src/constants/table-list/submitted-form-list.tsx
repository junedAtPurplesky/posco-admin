"use client";
import { getDepartmentStyle } from "@/utils/helpers/getDepartmentStyle";
import { ITableAction, ITableColumn } from "../table";
import { getScoreColor } from "@/utils/helpers/get";

export interface ISubmittedFormsListProps {
  id: number;
  staffName: string;
  submissionDate: string;
  department: string;
  complianceScore: string;
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

export const submittedFormsListColumns: ITableColumn<ISubmittedFormsListProps>[] = [
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
    cell: ({ value }) => <ComplianceScoreCell value={value as string} />,
  },
];

export const dummySubmittedFormsList: ISubmittedFormsListProps[] = [
  {
    id: 1,
    staffName: "John Smith",
    submissionDate: "2024-01-15",
    department: "worker",
    complianceScore: "92",
  },
];

export const submittedFormsListActions: ITableAction<ISubmittedFormsListProps>[] = [
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
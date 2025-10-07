"use client";
import { ITableAction, ITableColumn } from "../table";

export interface ISubmittedFormsListProps {
  id: number;
  staffName: string;
  submissionDate: string;
  department: string;
  complianceScore: string;
}

export const submittedFormsListColumns: ITableColumn<ISubmittedFormsListProps>[] =
  [
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
      header: "DEPARTMENT ",
      accessor: "department",
      sortable: true,
      headerClassName: "min-w-[12rem]",
    },
    {
      header: "COMPLIANCE SCORE",
      accessor: "complianceScore",
      sortable: true,
      headerClassName: "min-w-[12rem]",
    },
  ];

export const dummySubmittedFormsList: ISubmittedFormsListProps[] = [
  {
    id: 1,
    staffName: "John Smith",
    submissionDate: "2024-01-15",
    department: "Marketing",
    complianceScore: "92",
  },
];

export const submittedFormsListActions: ITableAction<ISubmittedFormsListProps>[] =
  [];

submittedFormsListActions.push({
  label: "Edit",
  onClick: (row: ISubmittedFormsListProps) => {
    console.log("Edit form submission:", row);
  },
  className: "text-green-500 hover:text-green-700",
});

submittedFormsListActions.push({
  label: "View Form",
  onClick: (row: ISubmittedFormsListProps) => {
    console.log("View form submission:", row);
  },
  className: "text-blue-500 hover:text-blue-700",
});
submittedFormsListActions.push({
  label: "View Staff",
  onClick: (row: ISubmittedFormsListProps) => {
    console.log(" View Staff List form:", row);
  },
  className: "text-blue-500 hover:text-blue-700",
});

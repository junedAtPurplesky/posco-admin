"use client";
import { ITableAction, ITableColumn } from "../table";

export interface IFormsListProps {
  id: number;
  formName: string;
  completionRate: string;
  dueDate: string;
  createdAt: string;
  status: string;
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
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "DUE DATE ",
    accessor: "dueDate",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "CREATED AT ",
    accessor: "createdAt",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "STATUS ",
    accessor: "status",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
];

export const dummyFormsList: IFormsListProps[] = [
  {
    id: 1,
    formName: "John Smith",
    completionRate: "2024-01-15",
    dueDate: "Marketing",
    createdAt: "92",
    status: "Pending",
  },
  {
    id: 2,
    formName: "Sarah Johnson",
    completionRate: "2024-01-15",
    dueDate: "Human Resources",
    createdAt: "88",
    status: "Pending",
  },
];

export const formsListActions: ITableAction<IFormsListProps>[] = [];

formsListActions.push({
  label: "Edit",
  onClick: (row: IFormsListProps) => {
    console.log("Edit form submission:", row);
  },
  className: "text-green-500 hover:text-green-700",
});

formsListActions.push({
  label: "View Form",
  onClick: (row: IFormsListProps) => {
    console.log("View form submission:", row);
  },
  className: "text-blue-500 hover:text-blue-700",
});
formsListActions.push({
  label: "Staff List",
  onClick: (row: IFormsListProps) => {
    console.log("Staff List form:", row);
  },
  className: "text-blue-500 hover:text-blue-700",
});

formsListActions.push({
  label: "Delete",
  onClick: (row: IFormsListProps) => {
    console.log("Delete form submission:", row);
  },
  className: "text-red-500 hover:text-red-700",
});

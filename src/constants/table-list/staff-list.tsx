"use client";
import { ITableAction, ITableColumn } from "../table";

export interface IStaffListProps {
  id: number;
  staffName: string;
  email: string;
  department: string;
  createdAt: string;
  status: string;
}

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
    header: "DEPARTMENT ",
    accessor: "department",
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

export const dummyStaffList: IStaffListProps[] = [
  {
    id: 1,
    staffName: "John Smith",
    email: "john@gmail.com",
    department: "Marketing",
    createdAt: "20-feb-2024",
    status: "Pending",
  },
  {
    id: 2,
    staffName: "John Smith",
    email: "john@gmail.com",
    department: "Marketing",
    createdAt: "20-feb-2024",
    status: "Pending",
  },
];

export const staffListActions: ITableAction<IStaffListProps>[] = [];

staffListActions.push({
  label: "View Form",
  onClick: (row: IStaffListProps) => {
    console.log("View form submission:", row);
  },
  className: "text-blue-500 hover:text-blue-700",
});
staffListActions.push({
  label: "View Staff",
  onClick: (row: IStaffListProps) => {
    console.log("View Staff form:", row);
  },
  className: "text-blue-500 hover:text-blue-700",
});


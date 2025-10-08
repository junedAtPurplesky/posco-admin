"use client";
import { ITableAction, ITableColumn } from "../table";

export interface IFormSubmissionProps {
  id: number;
  staffName: string;
  submissionDate: string;
  department: string;
  complianceScore: number;
}

//  Helper function to get text color based on score
function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-blue-600 ";
  if (score >= 60) return "text-yellow-600 ";
  return "text-red-600";
}

//  Updated cell component using helper function
function ComplianceScoreCell({ value }: { value: number }) {
  const colorClass = getScoreColor(value);
  return <span className={`${colorClass}`}>{value}%</span>;
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
  },
  {
    header: "COMPLIANCE SCORE",
    accessor: "complianceScore",
    sortable: true,
    headerClassName: "min-w-[12rem]",
    cell: ({ value }) => <ComplianceScoreCell value={value as number} />,
  },
];

export const dummyFormSubmissions: IFormSubmissionProps[] = [
  {
    id: 1,
    staffName: "John Smith",
    submissionDate: "2024-01-15",
    department: "Marketing",
    complianceScore: 20,
  },
  {
    id: 2,
    staffName: "Sarah Johnson",
    submissionDate: "2024-01-15",
    department: "Human Resources",
    complianceScore: 88,
  },
  {
    id: 3,
    staffName: "Michael Chen",
    submissionDate: "2024-01-15",
    department: "Engineering",
    complianceScore: 95,
  },
  {
    id: 4,
    staffName: "Emily Davis",
    submissionDate: "2024-01-15",
    department: "Sales",
    complianceScore: 78,
  },
  {
    id: 5,
    staffName: "Robert Wilson",
    submissionDate: "2024-01-14",
    department: "Finance",
    complianceScore: 85,
  },
  {
    id: 6,
    staffName: "Lisa Martinez",
    submissionDate: "2024-01-14",
    department: "Operations",
    complianceScore: 91,
  },
  {
    id: 7,
    staffName: "David Brown",
    submissionDate: "2024-01-14",
    department: "IT Support",
    complianceScore: 67,
  },
  {
    id: 8,
    staffName: "Jennifer Lee",
    submissionDate: "2024-01-13",
    department: "Customer Service",
    complianceScore: 82,
  },
  {
    id: 9,
    staffName: "Kevin Taylor",
    submissionDate: "2024-01-13",
    department: "Research & Development",
    complianceScore: 89,
  },
  {
    id: 10,
    staffName: "Amanda White",
    submissionDate: "2024-01-13",
    department: "Quality Assurance",
    complianceScore: 94,
  },
  {
    id: 11,
    staffName: "James Anderson",
    submissionDate: "2024-01-12",
    department: "Marketing",
    complianceScore: 76,
  },
  {
    id: 12,
    staffName: "Maria Garcia",
    submissionDate: "2024-01-12",
    department: "Human Resources",
    complianceScore: 90,
  },
  {
    id: 13,
    staffName: "Thomas Clark",
    submissionDate: "2024-01-12",
    department: "Engineering",
    complianceScore: 83,
  },
  {
    id: 14,
    staffName: "Sophia Rodriguez",
    submissionDate: "2024-01-11",
    department: "Sales",
    complianceScore: 79,
  },
  {
    id: 15,
    staffName: "Daniel Kim",
    submissionDate: "2024-01-11",
    department: "Finance",
    complianceScore: 96,
  },
  {
    id: 16,
    staffName: "Jessica Moore",
    submissionDate: "2024-01-11",
    department: "Operations",
    complianceScore: 72,
  },
  {
    id: 17,
    staffName: "Christopher Lee",
    submissionDate: "2024-01-10",
    department: "IT Support",
    complianceScore: 87,
  },
  {
    id: 18,
    staffName: "Olivia Harris",
    submissionDate: "2024-01-10",
    department: "Customer Service",
    complianceScore: 93,
  },
  {
    id: 19,
    staffName: "Matthew Walker",
    submissionDate: "2024-01-10",
    department: "Research & Development",
    complianceScore: 81,
  },
  {
    id: 20,
    staffName: "Emma Thompson",
    submissionDate: "2024-01-09",
    department: "Quality Assurance",
    complianceScore: 89,
  },
  {
    id: 21,
    staffName: "Andrew Martin",
    submissionDate: "2024-01-09",
    department: "Marketing",
    complianceScore: 84,
  },
  {
    id: 22,
    staffName: "Nicole Scott",
    submissionDate: "2024-01-09",
    department: "Human Resources",
    complianceScore: 77,
  },
  {
    id: 23,
    staffName: "Brian Adams",
    submissionDate: "2024-01-08",
    department: "Engineering",
    complianceScore: 91,
  },
];

export const formSubmissionActions: ITableAction<IFormSubmissionProps>[] = [];

formSubmissionActions.push({
  label: "View",
  onClick: (row: IFormSubmissionProps) => {
    console.log("View form submission:", row);
  },
  className: "text-blue-500 hover:text-blue-700",
});

formSubmissionActions.push({
  label: "Edit",
  onClick: (row: IFormSubmissionProps) => {
    console.log("Edit form submission:", row);
  },
  className: "text-green-500 hover:text-green-700",
});

formSubmissionActions.push({
  label: "Delete",
  onClick: (row: IFormSubmissionProps) => {
    console.log("Delete form submission:", row);
  },
  className: "text-red-500 hover:text-red-700",
});

formSubmissionActions.push({
  label: "Download",
  onClick: (row: IFormSubmissionProps) => {
    console.log("Download form submission:", row);
  },
  className: "text-purple-500 hover:text-purple-700",
});

formSubmissionActions.push({
  label: "Approve",
  onClick: (row: IFormSubmissionProps) => {
    console.log("Approve form submission:", row);
  },
  className: "text-green-500 hover:text-green-700",
});

formSubmissionActions.push({
  label: "Reject",
  onClick: (row: IFormSubmissionProps) => {
    console.log("Reject form submission:", row);
  },
  className: "text-orange-500 hover:text-orange-700",
});

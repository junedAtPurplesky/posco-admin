import { ListIcon, NotIcon, PercentageIcon } from "@/features";

// constants/analysis-card-data.ts
export interface AnalysisCardData {
  id: number;
  value: string;
  title: string;
  subtitle?: string;
  subValue?: string;
  icon?: React.ReactNode;
  color?: string;
}

export const analysisCardsData: AnalysisCardData[] = [
  {
    id: 1,
    icon: <ListIcon />,
    value: "128",
    title: "Daily Safety Forms Received",
    subtitle: "92% Completion Rate",
    subValue: "/ 137",
    color: "text-primary",
  },
  {
    id: 2,
    icon: <NotIcon />,

    value: "9",
    subValue: "Issues Found",

    title: "Pending Approvals",
    subtitle: "Requires immediate attention",
    color: "text-primary",
  },
  {
    id: 3,
    icon: <PercentageIcon />,

    value: "92%",
    subValue: "Active",
    title: "Staff Participation",
    subtitle: "Monthly target achieved",

    color: "text-primary",
  },
];

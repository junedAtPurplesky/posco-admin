// components/AnalysisCardList.tsx
import React from "react";
import { AnalysisCard } from "../analysis-card/AnalysisCard";
import { useAdminDashboardStatsQuery } from "@/services/apis";
import { PercentageIcon } from "@/design-system";
import { ListIcon, NotIcon } from "@/features/icons";
import { AnalysisCardData } from "@/constants/analysis-card-data";

interface AnalysisCardListProps {
  className?: string;
  cardClassName?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function AnalysisCardList({
  className = "",
  cardClassName = "",
}: AnalysisCardListProps) {
  const { allStatsData } = useAdminDashboardStatsQuery();

  const analysisCardsData: AnalysisCardData[] = [
    {
      id: 1,
      icon: <ListIcon />,
      value: `${allStatsData?.data.dailySafetyFormsReceived}`,
      title: "Daily Safety Forms Received",
      subtitle: "92% Completion Rate",
      subValue: "/ 137",
      color: "text-primary",
    },
    {
      id: 2,
      icon: <NotIcon />,

      value: `${allStatsData?.data.nonCompliantReports}`,
      subValue: "Issues Found",

      title: "Pending Approvals",
      subtitle: "Requires immediate attention",
      color: "text-primary",
    },
    {
      id: 3,
      icon: <PercentageIcon />,

      value: `${allStatsData?.data.staffParticipationRate}%`,
      subValue: "Active",
      title: "Staff Participation",
      subtitle: "Monthly target achieved",

      color: "text-primary",
    },
  ];

  return (
    <div className={`flex flex-wrap gap-3 sm:gap-6 ${className}`}>
      {analysisCardsData.map((card) => (
        <AnalysisCard data={card} key={card.id} className={cardClassName} />
      ))}
    </div>
  );
}

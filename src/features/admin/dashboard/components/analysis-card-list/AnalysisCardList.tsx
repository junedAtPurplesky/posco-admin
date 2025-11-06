import React from "react";

import { AnalysisCard } from "../analysis-card";

import { useAdminDashboardStatsQuery } from "@/services/apis";
import { PercentageIcon } from "@/design-system";
import { ListIcon } from "@/features";
import { AnalysisCardData } from "@/constants";

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
  
  const dailySafetyFormsReceived =
    allStatsData?.data?.dailySafetyFormsReceived ?? 0;
  // const nonCompliantReports = allStatsData?.data?.nonCompliantReports ?? 0;
  const staffParticipationRate =
    allStatsData?.data?.staffParticipationRate ?? 0;
  const totalAssignedForms = allStatsData?.data?.userAssignments?.total_Assignments;

  const analysisCardsData: AnalysisCardData[] = [
    {
      id: 1,
      icon: <ListIcon />,
      value: `${dailySafetyFormsReceived}`,
      title: "Daily Safety Forms Received",
      subtitle: "92% Completion Rate",
      subValue: `/ ${totalAssignedForms}`,
      color: "text-primary",
    },
    // {
    //   id: 2,
    //   icon: <NotIcon />,
    //   value: `${nonCompliantReports}`,
    //   subValue: "Issues Found",
    //   title: "Pending Approvals",
    //   subtitle: "Requires immediate attention",
    //   color: "text-primary",
    // },
    {
      id: 3,
      icon: <PercentageIcon />,
      value: `${staffParticipationRate}%`,
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

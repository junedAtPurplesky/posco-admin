"use client";
import React, { useEffect, useState, useMemo } from "react";
import { PieChart } from "../pi-chart/PiChart";
import { useIssueDistributionChartDataQuery } from "@/services/apis";

export function IssueDistributionByCategoryChart() {
  const { chartData, isLoading, isError } =
    useIssueDistributionChartDataQuery();
  const [chartSize, setChartSize] = useState(220);

  useEffect(() => {
    const handleResize = () => {
      setChartSize(window.innerWidth <= 1024 ? 160 : 220);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = useMemo(() => {
    return [
      {
        label: "General Safety",
        value: (chartData?.data.general_safety) || 0,
        color: "#3B82F6",
      },
      {
        label: "Emergency Exits",
        value: chartData?.data.emergency_exits || 0,
        color: "#EF4444",
      },
      {
        label: "Fire Safety",
        value: chartData?.data.fire_safety || 0,
        color: "#F59E0B",
      },
      {
        label: "Equipment Safety",
        value: chartData?.data.equipment_safety || 0,
        color: "#10B981",
      },
    ];
  }, [chartData]);

  if (isLoading) return <p>Loading chart...</p>;
  if (isError) return <p>Failed to load chart data.</p>;

  return (
    <PieChart
      data={data}
      title="Issue Distribution by Category"
      size={chartSize}
      className="w-full"
    />
  );
}

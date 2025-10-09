"use client";

import React, { useEffect, useState, useMemo } from "react";
import { PieChart } from "../pi-chart/PiChart";
import { useSafetyComplianceChartDataQuery } from "@/services/apis";

export function SafetyComplianceOverviewChart() {
  const { chartData, isLoading, isError } = useSafetyComplianceChartDataQuery();
  const [chartSize, setChartSize] = useState(220);

  // Responsive chart size
  useEffect(() => {
    const handleResize = () => {
      setChartSize(window.innerWidth <= 1024 ? 160 : 220);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prepare chart data dynamically
  const data = useMemo(() => {
    return [
      {
        label: "Compliant (Safe)",
        value: chartData?.data?.compliant || 0,
        color: "#10B981",
      },
      {
        label: "Non-Compliant (Unsafe)",
        value: chartData?.data?.non_compliant || 0,
        color: "#EF4444",
      },
    ];
  }, [chartData]);

  if (isLoading) return <p>Loading chart...</p>;
  if (isError) return <p>Failed to load chart data.</p>;

  return (
    <PieChart
      data={data}
      title="Safety Compliance Overview"
      size={chartSize}
      className="w-full"
    />
  );
}

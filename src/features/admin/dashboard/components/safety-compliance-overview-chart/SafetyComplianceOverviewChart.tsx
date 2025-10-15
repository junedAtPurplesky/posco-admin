"use client";

import React, { useEffect, useState, useMemo } from "react";
import { PieChart } from "../pi-chart/PiChart";
import { useSafetyComplianceChartDataQuery } from "@/services/apis";

export function SafetyComplianceOverviewChart() {
  const { chartData, isLoading, isError } = useSafetyComplianceChartDataQuery();
  const [chartSize, setChartSize] = useState(220);

  // Debug
  console.log("Full API response:", chartData);
  console.log("Data values:", chartData?.data);

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
    if (!chartData?.data) {
      return [
        { label: "Compliant (Safe)", value: 0, color: "#10B981" },
        { label: "Non-Compliant (Unsafe)", value: 0, color: "#EF4444" },
      ];
    }

    return [
      {
        label: "Compliant (Safe)",
        value: chartData.data.compliant || 0,
        color: "#10B981",
      },
      {
        label: "Non-Compliant (Unsafe)",
        value: chartData.data.non_compliant || 0,
        color: "#EF4444",
      },
    ];
  }, [chartData]);

  if (isLoading) return <div className="p-4 text-center">Loading chart...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Failed to load chart data.</div>;

  console.log("Final chart data:", data);

  return (
    <div className="w-full p-4 border rounded-lg">
      <PieChart
        data={data}
        title="Safety Compliance Overview"
        size={chartSize}
        className="w-full"
      />
    </div>
  );
}
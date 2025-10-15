"use client";

import { useEffect, useState, useMemo } from "react";
import { useSafetyComplianceChartDataQuery } from "@/services/apis";
import { PieChart } from "../pi-chart";

export function SafetyComplianceOverviewChart() {
  const [chartSize, setChartSize] = useState(220);

  const { chartData, isLoading, isError } = useSafetyComplianceChartDataQuery();

  useEffect(() => {
    const handleResize = () => setChartSize(window.innerWidth <= 1024 ? 160 : 220);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prepare chart data safely with default values
  const data = useMemo(() => {
    if (!chartData?.data) return []; // wait for API

    const compliant = chartData.data.compliant ?? 0;
    const nonCompliant = chartData.data.non_compliant ?? 0;

    return [
      { label: "Compliant", value: compliant, color: "#10B981" },
      { label: "Non-Compliant", value: nonCompliant, color: "#EF4444" },
    ];
  }, [chartData]);

  if (isLoading) return <div className="p-4 text-center">Loading chart...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Failed to load chart data.</div>;

  return (
    <div className="w-full bg-white rounded-lg ">
      <PieChart data={data} title="Safety Compliance Overview" size={chartSize} className="w-full" />
    </div>
  );
}
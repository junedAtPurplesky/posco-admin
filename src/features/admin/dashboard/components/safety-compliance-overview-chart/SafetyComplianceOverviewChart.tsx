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

  // Prepare chart data
  const data = useMemo(() => {
    const compliant = chartData?.data?.compliant ?? 0;
    const nonCompliant = chartData?.data?.non_compliant ?? 0;
    const total = compliant + nonCompliant;

    // If total is 0 → no data
    if (total === 0) {
      return [
        { label: "Compliant (Safe)", value: 0, color: "#10B981" },
        { label: "Non-Compliant (Unsafe)", value: 0, color: "#EF4444" },
      ];
    }

    //  Normalize data to ensure values add up to total
    return [
      { label: "Compliant (Safe)", value: compliant, color: "#10B981" },
      { label: "Non-Compliant (Unsafe)", value: nonCompliant, color: "#EF4444" },
    ];
  }, [chartData]);

  if (isLoading)
    return <div className="p-4 text-center">Loading chart...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load chart data.
      </div>
    );

  return (
    <div className="w-full rounded-lg bg-white">
      <PieChart
        data={data}
        title="Safety Compliance Overview"
        size={chartSize}
        className="w-full"
      />
    </div>
  );
}

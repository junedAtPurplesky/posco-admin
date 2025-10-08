"use client";
import React, { useEffect, useState } from "react";
import { PieChart } from "../pi-chart/PiChart";
import { IChartCategory, useGetChartDataQuery } from "@/services/apis";

export function SafetyComplianceOverviewChart() {
  const [chartSize, setChartSize] = useState(220);

  //  Use the hook for fetching compliance data
  const { chartData, isLoading } = useGetChartDataQuery();

  useEffect(() => {
    const handleResize = () => {
      setChartSize(window.innerWidth <= 1024 ? 160 : 220);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  Format API data safely
  const formattedData =
    chartData?.data?.map((item: IChartCategory) => ({
      label: item.name,
      value: item.value,
      color:
        item.name === "Compliant (Safe)"
          ? "#10B981"
          : item.name === "Non-Compliant (Unsafe)"
          ? "#EF4444"
          : "#F59E0B",
    })) || [];

  return (
    <div className="bg-white p-4 w-full ">
      <h3 className="text-[1.1rem] font-normal text-gray-800">
        Safety Compliance Overview
      </h3>

      <div className="flex justify-center items-center h-[15rem]">
        {isLoading ? (
          <p className="text-gray-500">Loading chart data...</p>
        ) : formattedData.length === 0 ? (
          <p className="text-gray-400">No data available</p>
        ) : (
          <PieChart data={formattedData} size={chartSize} className="w-full" />
        )}
      </div>
    </div>
  );
}

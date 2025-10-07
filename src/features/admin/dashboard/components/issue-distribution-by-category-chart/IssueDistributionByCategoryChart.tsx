import React, { useEffect, useState } from "react";
import { PieChart } from "../pi-chart/PiChart";

export function IssueDistributionByCategoryChart() {
  const [chartSize, setChartSize] = useState(220);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setChartSize(160);
      } else {
        setChartSize(220);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { label: "General Safety", value: 30, color: "#3B82F6" },
    { label: "Emergency Exits", value: 30, color: "#EF4444" },
    { label: "Fire Safety", value: 20, color: "#F59E0B" },
    { label: "Equipment Safety", value: 20, color: "#10B981" },
  ];

  return (
    <PieChart
      data={data}
      title="Issue Distribution by Category"
      size={chartSize}
      className="w-full"
    />
  );
}

import { useEffect, useState } from "react";
import { PieChart } from "../pi-chart/PiChart";

export function SafetyComplianceOverviewChart() {
  const [chartSize, setChartSize] = useState(220);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setChartSize(160);
      } else {
        setChartSize(220);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { label: "Compliant (Safe)", value: 30, color: "#10B981" },
    { label: "Non-Compliant (Unsafe)", value: 20, color: "#EF4444" },
  ];

  return (
    <PieChart
      data={data}
      title="Safety Compliance Overview"
      size={chartSize}
      className="w-full"
    />
  );
}

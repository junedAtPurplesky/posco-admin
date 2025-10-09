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

// "use client";
// import React, { useEffect, useState } from "react";
// import { PieChart } from "../pi-chart/PiChart";
// import { useGetChartDataQuery } from "@/services/apis/clients/community-client/query-hooks/useGetIssueChartDataQuery";
// import { IChartCategory } from "@/services/apis";

// export function IssueDistributionByCategoryChart() {
//   const [chartSize, setChartSize] = useState(220);
//   const { chartData, isLoading } = useGetChartDataQuery();

//   useEffect(() => {
//     const handleResize = () => {
//       setChartSize(window.innerWidth <= 1024 ? 160 : 220);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   //  Format chart data safely
//   const formattedData =
//     chartData?.data?.map((item: IChartCategory) => ({
//       label: item.name,
//       value: item.value,
//       color:
//         item.name === "General Safety"
//           ? "#3B82F6"
//           : item.name === "Emergency Exits"
//           ? "#EF4444"
//           : item.name === "Fire Safety"
//           ? "#F59E0B"
//           : "#10B981",
//     })) || [];

//   return (
//     <div className="bg-white p-4 w-full">
//       {/*  Title always visible */}
//       <h3 className="text-[1.1rem] font-normal text-gray-800 ">
//         Issue Distribution by Category
//       </h3>

//       {/*  Chart / Loader / Empty State */}
//       <div className="flex justify-center items-center h-[240px]">
//         {isLoading ? (
//           <p className="text-gray-500">Loading chart data...</p>
//         ) : formattedData.length === 0 ? (
//           <p className="text-gray-400">No data available</p>
//         ) : (
//           <PieChart
//             data={formattedData}
//             size={chartSize}
//             className="w-full"
//           />
//         )}
//       </div>
//     </div>
//   );
// }

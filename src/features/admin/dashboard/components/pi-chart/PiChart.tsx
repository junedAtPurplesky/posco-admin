import React from "react";

// import { ThreeIcon } from "@/features";

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  title?: string;
  size?: number;
  className?: string;
}

export function PieChart({
  data,
  title,
  size = 200,
  className = "",
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item?.value, 0);
  const radius = size / 2;

  let segments;

  const isEmpty = total === 0;

  if (isEmpty) {
    // Render full gray chart when no data
    segments = [
      {
        label: "No Data",
        value: 1,
        color: "#8DBBDC", // Tailwind gray-300
        pathData: [
          `M ${radius} ${radius}`,
          `L ${radius} 0`,
          `A ${radius} ${radius} 0 1 1 ${radius - 0.01} 0`,
          "Z",
        ].join(" "),
        percentage: 100,
      },
    ];
  } else {
    let accumulatedPercentage = 0;
    segments = data.map((item) => {
      const percentage = (item?.value / total) * 100;
      const startPercentage = accumulatedPercentage;
      accumulatedPercentage += percentage;

      const startAngle = (startPercentage / 100) * 360;
      const endAngle = (accumulatedPercentage / 100) * 360;

      const startX =
        radius + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
      const startY =
        radius + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
      const endX =
        radius + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
      const endY =
        radius + radius * Math.sin((endAngle - 90) * (Math.PI / 180));

      const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

      const pathData = [
        `M ${radius} ${radius}`,
        `L ${startX} ${startY}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        "Z",
      ].join(" ");

      return {
        ...item,
        pathData,
        percentage: Math.round(percentage),
      };
    });
  }

  return (
    <div className={`bg-white w-full p-4 ${className}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-[1.1rem] font-normal text-gray-800 mb-4 text-start">
          {title}
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* SVG Chart */}
        <div className="relative">
          <svg width={size} height={size} className="transform ">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={segment.pathData}
                fill={segment.color}
                stroke=""
                strokeWidth="1"
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
            {isEmpty && (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
              >
                No Data
              </text>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {data.map((segment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: isEmpty ? "#8DBBDC" : segment.color }}
                />
                <span className="text-sm text-[#0880EA] font-medium">
                  {segment.label} ({isEmpty ? "0" : Math.round((segment.value / total) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
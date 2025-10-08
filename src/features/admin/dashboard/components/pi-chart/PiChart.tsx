import { ThreeIcon } from "@/features";
import React from "react";

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
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulatedPercentage = 0;

  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const startPercentage = accumulatedPercentage;
    accumulatedPercentage += percentage;

    const startAngle = (startPercentage / 100) * 360;
    const endAngle = (accumulatedPercentage / 100) * 360;

    // Calculate SVG path for the segment
    const radius = size / 2;
    const startX =
      radius + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
    const startY =
      radius + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
    const endX = radius + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
    const endY = radius + radius * Math.sin((endAngle - 90) * (Math.PI / 180));

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

  return (
    <div
      className={`bg-white w-full p-4 ${className}`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-[1.1rem] font-normal text-gray-800 mb-4 text-start">
          {title}
        </h3>
        <ThreeIcon className="h-4 w-4" />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* SVG Chart */}
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
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
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-[#0880EA] font-medium">
                  {segment.label} ({segment.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
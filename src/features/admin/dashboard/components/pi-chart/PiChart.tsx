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

export function PieChart({ data, title, size = 200, className = "" }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2;
  const center = radius;

  const isEmpty = total === 0;

  const getCoordinates = (percent: number) => {
    const angle = 2 * Math.PI * percent - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  const segments = isEmpty
    ? [
        {
          label: "No Data",
          value: 1,
          color: "#D1D5DB",
          pathData: `M ${center} ${center} L ${center} 0 A ${radius} ${radius} 0 1 1 ${center - 0.01} 0 Z`,
          percentage: 100,
        },
      ]
    : (() => {
        let cumulative = 0;
        return data.map((item) => {
          const startPercent = cumulative;
          const percent = item.value / total;
          cumulative += percent;

          const start = getCoordinates(startPercent);
          const end = getCoordinates(cumulative);

          const largeArcFlag = percent > 0.5 ? 1 : 0;

          // Special case: full circle
          const pathData =
            percent === 1
              ? `M ${center} ${center} m -${radius},0 a ${radius},${radius} 0 1,0 ${radius * 2},0 a ${radius},${radius} 0 1,0 -${radius * 2},0`
              : `M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;

          return { ...item, pathData, percentage: Math.round(percent * 100) };
        });
      })();

  return (
    <div className={`bg-white w-full p-4 ${className}`}>
      {title && <h3 className="text-[1.1rem] font-normal text-gray-800 mb-4">{title}</h3>}

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Pie SVG */}
        <svg width={size} height={size}>
          {segments.map((seg, idx) => (
            <path key={idx} d={seg.pathData} fill={seg.color}  />
          ))}
          {isEmpty && (
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#6B7280">
              No Data
            </text>
          )}
        </svg>

        {/* Legend */}
        <div className="space-y-2">
          {data.map((seg, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-sm font-medium text-gray-700">
                {seg.label} ({total === 0 ? 0 : Math.round((seg.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

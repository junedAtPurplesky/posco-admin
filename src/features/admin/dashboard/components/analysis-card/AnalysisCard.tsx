// components/AnalysisCard.tsx
import { AnalysisCardData } from "@/constants/analysis-card-data";
import { NotIcon } from "@/features/icons";
import React from "react";

interface AnalysisCardProps {
  data: AnalysisCardData;
  className?: string;
}

export function AnalysisCard({ data, className = "" }: AnalysisCardProps) {
  return (
    <div
      className={`rounded-xl p-6 w-full sm:w-[20rem] shadow-sm bg-white border border-[#CACACA] ${className}`}
    >
      <div className="flex flex-col gap-6 h-full">
        <div className="flex justify-between items-center">
          <div className="h-12 w-12 bg-[#0B7AB5] rounded-full p-4 ">
            {data.icon}
          </div>

          <div className="flex gap-2 place-items-baseline">
            <span
              className={`text-[1.5rem] font-normal ${
                data.color || "text-gray-800"
              }`}
            >
              {data.value}
            </span>
            <span className="text-[1.1rem]"> {data.subValue}</span>{" "}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <NotIcon className="h-4 w-4 rotate-180" color="#000000" />
          <h3 className="font-normal text-gray-800  leading-tight text-[0.9rem]">
            {data.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

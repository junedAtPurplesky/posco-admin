import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { ITableHeaderProps } from "@/constants";

export function TableHeader<T>({
  column,
  sortBy,
  sortOrder,
  onSort,
}: ITableHeaderProps<T>) {
  const isSorted = sortBy === column.accessor;

  return (
    <th
      className={`border-b-2 border-white p-3 font-medium whitespace-nowrap bg-[#F8F9FB] ${column.sortable ? "cursor-pointer" : ""} ${column.headerClassName || ""}`}
      onClick={() => column.sortable && onSort(column?.accessor)}
    >
      <div className="flex justify-center items-center text-[0.9rem]  gap-4 whitespace-nowrap">
        <h1>{column.header}</h1>
        {column.sortable && (
          <div>
            {isSorted ? (
              sortOrder === "asc" ? (
                <IoIosArrowUp className="w-4 h-4" />
              ) : (
                <IoIosArrowDown className="w-4 h-4" />
              )
            ) : (
              <IoIosArrowDown className="w-4 h-4" />
            )}
          </div>
        )}
      </div>
    </th>
  );
}

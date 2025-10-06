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
      className={`p-3 ${column.sortable ? "cursor-pointer" : ""} ${column.headerClassName || ""}`}
      onClick={() => column.sortable && onSort(column.accessor)}
    >
      <div className="flex items-center justify-center gap-4">
        <h1>{column.header}</h1>
        <div>
          {column.sortable &&
            (isSorted ? (
              sortOrder === "asc" ? (
                <IoIosArrowUp className="w-4 h-4" />
              ) : (
                <IoIosArrowDown className="w-4 h-4" />
              )
            ) : (
              <IoIosArrowDown className="w-4 h-4" />
            ))}
        </div>
      </div>
    </th>
  );
}

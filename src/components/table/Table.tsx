"use client";
import { useState, useMemo } from "react";

import { Pagination, TableHeader, TableRow } from "./components";

import { ITableProps } from "@/constants";

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function Table<T extends { id: string | number }>({
  data,
  columns,
  pageSize = 10,
  actions,
  paginationData,
  onPageChange,
}: ITableProps<T> & {
  paginationData?: PaginationData;
  onPageChange?: (page: number) => void;
}) {
  const [currentPage, setCurrentPage] = useState(paginationData?.page || 1);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openActionId, setOpenActionId] = useState<string | number | null>(
    null
  );

  // Update current page when pagination data changes
  useMemo(() => {
    if (paginationData?.page) {
      setCurrentPage(paginationData.page);
    }
  }, [paginationData?.page]);

  const handleSort = (accessor: keyof T) => {
    if (sortBy === accessor) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(accessor);
      setSortOrder("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sortBy, sortOrder]);

  // Use server-side pagination if available, otherwise use client-side
  const paginatedData = useMemo(() => {
    if (paginationData) {
      // Server-side pagination - data is already paginated
      return sortedData;
    } else {
      // Client-side pagination
      const start = (currentPage - 1) * pageSize;
      return sortedData.slice(start, start + pageSize);
    }
  }, [sortedData, currentPage, pageSize, paginationData]);

  const handlePageChange = (page: number) => {
    setOpenActionId(null);

    if (onPageChange) {
      onPageChange(page);
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="scrollbar-hide overflow-x-auto border border-white rounded-xl scrollbar-hide">
        <table className="w-full text-[0.9rem] text-left border-gray-100">
          <thead className="text-gray-700">
            <tr>
              {actions && actions?.length > 0 && (
                <th className="border-b-2 border-white text-center min-w-[6rem] bg-[#F8F9FB] p-3 text-[0.9rem]  uppercase font-medium">
                  ID
                </th>
              )}

              {columns.length > 0 &&
                columns.map((col) => (
                  <TableHeader
                    key={String(col.accessor)}
                    column={col}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  />
                ))}
              {actions && actions?.length > 0 && (
                <th className="text-center min-w-[5rem] bg-[#F8F9FB] p-3 text-[0.9rem]  uppercase font-medium border-b-2 border-white">
                  Action
                </th>
              )}
            </tr>
          </thead>
          {/* <tbody>
            {paginatedData.length > 0 &&
              paginatedData.map((row, idx) => {
                const serialNumber = paginationData
                  ? (paginationData.page - 1) * paginationData.limit + idx
                  : (currentPage - 1) * pageSize + idx;
                return (
                  <TableRow
                    key={row.id}
                    row={row}
                    columns={columns}
                    actions={actions}
                    index={serialNumber}
                    openActionId={openActionId}
                    setOpenActionId={setOpenActionId}
                  />
                );
              })}
          </tbody> */}
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => {
                const serialNumber = paginationData
                  ? (paginationData.page - 1) * paginationData.limit + idx
                  : (currentPage - 1) * pageSize + idx;
                return (
                  <TableRow
                    key={row.id}
                    row={row}
                    columns={columns}
                    actions={actions}
                    index={serialNumber}
                    openActionId={openActionId}
                    setOpenActionId={setOpenActionId}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={
                    actions && actions.length > 0
                      ? columns.length + 2
                      : columns.length + 1
                  }
                  className="text-center py-10 text-gray-400 text-lg"
                >
                  No data found. Create one data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={
          paginationData?.totalPages || Math.ceil(data.length / pageSize)
        }
        onPageChange={handlePageChange}
      />
    </div>
  );
}

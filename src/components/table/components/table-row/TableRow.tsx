import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ITableColumn, ITableRowProps } from "@/constants";
import { getInitials, getRandomColor } from "@/utils";
import { FiMoreVertical } from "react-icons/fi";

export function TableRow<
  T extends { id: string | number; assigned_to?: string }
>({
  row,
  columns,
  actions = [],
  openActionId,
  setOpenActionId,
  index,
}: ITableRowProps<T> & {
  index: number;
  openActionId: string | number | null;
  setOpenActionId: (id: string | number | null) => void;
}) {
  const isOpen = openActionId === row.id;

  const actionRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenActionId(null);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setOpenActionId]);

  // Position the dropdown using viewport measurements so it doesn't get clipped by the table
  useEffect(() => {
    function updateMenuPosition() {
      if (!isOpen || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const margin = 8;

      // Try to use measured size if available
      const measuredWidth = actionRef.current?.offsetWidth || 180;
      const measuredHeight = actionRef.current?.offsetHeight || 200;

      let left = rect.right + scrollX - measuredWidth; // align right edges by default
      let top = rect.bottom + scrollY; // place below by default

      // If overflowing bottom, place above
      if (top + measuredHeight > scrollY + viewportHeight - margin) {
        const aboveTop = rect.top + scrollY - measuredHeight;
        if (aboveTop >= scrollY + margin) {
          top = aboveTop;
        }
      }

      // Clamp within viewport horizontally
      const minX = scrollX + margin;
      const maxX = scrollX + viewportWidth - measuredWidth - margin;
      left = Math.min(Math.max(left, minX), maxX >= minX ? maxX : minX);

      // Clamp vertically just in case
      const minY = scrollY + margin;
      const maxY = scrollY + viewportHeight - measuredHeight - margin;
      top = Math.min(Math.max(top, minY), maxY >= minY ? maxY : minY);

      setMenuStyles({ position: "absolute", top, left, zIndex: 9999 });
    }

    if (isOpen) {
      // Defer to ensure the menu is rendered before measuring
      setTimeout(updateMenuPosition, 0);
      window.addEventListener("resize", updateMenuPosition);
      window.addEventListener("scroll", updateMenuPosition, true);
    }

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen]);

  return (
    <tr className="bg-[#F8F9FB] hover:bg-gray-100 relative whitespace-nowrap border-b-2 border-white">
      <td className="text-center p-3 text-[0.9rem] font-medium text-gray-700">
        {String(index + 1).padStart(1, "0")}
      </td>

      {columns.length > 0 &&
        columns.map((col, index) => (
          <TableCell key={index} row={row} col={col} index={index} />
        ))}
      {actions.length > 0 && (
        <td className="p-3 relative text-center capitalize">
          <button
            ref={buttonRef}
            onClick={() => setOpenActionId(isOpen ? null : row.id)}
            className="p-1 rounded hover:bg-gray-200"
          >
            <FiMoreVertical className="w-5 h-5" />
          </button>

          {isOpen &&
            typeof window !== "undefined" &&
            typeof document !== "undefined" &&
            createPortal(
              <div
                ref={actionRef}
                style={menuStyles}
                className="bg-white shadow-lg rounded border w-fit min-w-[8rem] "
              >
                {actions.length > 0 &&
                  actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={`block w-full px-4 text-[0.9rem] py-1 text-left hover:bg-gray-100 ${
                        action.className || ""
                      }`}
                      onClick={() => {
                        setOpenActionId(null);
                        action.onClick(row);
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {action.label}
                    </button>
                  ))}
              </div>,
              document.body
            )}
        </td>
      )}
    </tr>
  );
}

type TableCellProps<T extends { id: string | number }> = {
  row: T;
  col: ITableColumn<T>;
  index: number;
};

export function TableCell<T extends { id: string | number }>({
  row,
  col,
  index,
}: TableCellProps<T>) {
  const value = row[col.accessor];
  const initials = typeof value === "string" ? getInitials(value) : "";
  const isAssignedTo = col.accessor === "assigned_to";
  const isStatusColumn =
    col.accessor === "status_id" || col.accessor === "status";
  const isEmailColumn = col.accessor === "email";
  const isColorColumn = col.accessor === "color";
  // const isPriorityColumn = col.accessor === "priority";
  // const isTypeColumn = col.accessor === "type";
  const randomColor =
    typeof value === "string" ? getRandomColor(value) : "#000000";
  const getStatusColor = (statusValue: string) => {
    const statusLower = statusValue.toLowerCase();
    switch (statusLower) {
      case "pending":
        return "#fbbf24"; // yellow
      case "in progress":
      case "in_progress":
        return "#3b82f6"; // blue
      case "completed":
        return "#10b981"; // green
      case "open":
        return "#f59e0b"; // amber
      case "closed":
        return "#6b7280"; // gray
      default:
        return "#888888"; // default gray
    }
  };

  const statusColor =
    isStatusColumn && typeof value === "string"
      ? getStatusColor(value)
      : (row as { color?: string })?.color || "#888888";

  // const getCellBackgroundColor = () => {
  //   if (isStatusColumn) {
  //     // Use the status_color from row data if available, otherwise fallback to calculated color
  //     return (row as { status_color?: string })?.status_color || getStatusColor(String(value));
  //   }
  //   if (isPriorityColumn && typeof value === 'string') {
  //     const priority = value.toLowerCase();
  //     switch (priority) {
  //       case 'high':
  //         return '#fef2f2'; // light red
  //       case 'medium':
  //         return '#fffbeb'; // light yellow
  //       case 'low':
  //         return '#f0fdf4'; // light green
  //       default:
  //         return 'transparent';
  //     }
  //   }
  //   if (isTypeColumn && typeof value === 'string') {
  //     return '#f8fafc'; // light gray
  //   }
  //   return 'transparent';
  // };

  const renderEmailCell = (emailValue: unknown) => {
    if (Array.isArray(emailValue)) {
      return (
        <div className="flex flex-col gap-1">
          {emailValue.length > 0 ? (
            emailValue.map((email, idx) => (
              <a
                key={idx}
                href={`mailto:${String(email)}`}
                className="text-[0.9rem]"
              >
                {String(email)}
              </a>
            ))
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      );
    }

    const emails = String(emailValue)
      .split(/,\s*/) // Split by comma followed by optional whitespace
      .map((email) => email.trim())
      .filter(Boolean);

    return emails.length > 0 ? (
      <div className="flex flex-col gap-1">
        {emails.map((email, idx) => (
          <a key={idx} href={`mailto:${email}`} className="text-[0.9rem]">
            {email}
          </a>
        ))}
      </div>
    ) : (
      <span className="text-gray-400">-</span>
    );
  };

  return (
    <td
      key={index}
      className={`${isStatusColumn ? "flex justify-center" : ""} text-center p-3 text-[0.9rem] text-gray-700 ${
        isEmailColumn ? "" : "capitalize"
      }`}
      // style={{ backgroundColor: getCellBackgroundColor() }}
    >
      {col.cell ? (
        col.cell({ row, value })
      ) : isAssignedTo && typeof value === "string" && value.trim() !== "" ? (
        <div className="flex items-center gap-2">
          <p
            className="flex items-center justify-center p-2 w-10 h-10 text-white text-[0.9rem] rounded-full"
            style={{ backgroundColor: randomColor }}
          >
            {initials}
          </p>
          <p className="px-3 py-1 text-[0.9rem]">{value}</p>
        </div>
      ) : isStatusColumn && typeof value === "string" && value.trim() !== "" ? (
        <span
          className="inline-block px-3 py-1 rounded-full text-white text-[0.8rem] font-medium shadow-sm"
          style={{ backgroundColor: statusColor }}
        >
          {value}
        </span>
      ) : isColorColumn ? (
        value ? (
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-6 h-6 rounded-full border border-gray-300"
              // style={{ backgroundColor: String(value) }}
            />
            <span className="text-xs">{String(value)}</span>
          </div>
        ) : (
          <span className="text-gray-400">-</span>
        )
      ) : isEmailColumn ? (
        renderEmailCell(value)
      ) : (
        ((value === null || value === undefined || (typeof value === "string" && value.trim() === "")) ? (
          <span className="text-gray-400">-</span>
        ) : (
          (value as React.ReactNode)
        ))
      )}
    </td>
  );
}

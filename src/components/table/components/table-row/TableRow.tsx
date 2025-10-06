import { ITableRowProps } from "@/constants";
import { FiMoreVertical } from "react-icons/fi";

export function TableRow<T extends { id: string | number }>({
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

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 relative">
      <td className="p-3 font-medium text-gray-700">
        {String(index + 1).padStart(1, "0")}
      </td>
      {columns.map((col) => (
        <td key={String(col.accessor)} className="p-3">
          {String(row[col.accessor])}
        </td>
      ))}

      {actions.length > 0 && (
        <td className="p-3 relative">
          <button
            onClick={() =>
              setOpenActionId(isOpen ? null : (row.id as string | number))
            }
            className="p-1 rounded hover:bg-gray-200"
          >
            <FiMoreVertical className="w-5 h-5" />
          </button>

          {isOpen && (
            <div className="absolute right-[90%] top-[80%] bg-white shadow-lg rounded border z-10 w-32 2xl:w-[8vw]">
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={`block w-full px-4 py-2 text-center hover:bg-gray-100 ${
                    action.className || ""
                  }`}
                  onClick={() => {
                    setOpenActionId(null);
                    action.onClick(row);
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </td>
      )}
    </tr>
  );
}

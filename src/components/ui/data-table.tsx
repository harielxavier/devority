"use client";

import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  className = "",
  onRowClick,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;
      
      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [data, sortColumn, sortDirection]);

  return (
    <div className={`w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className={`px-6 py-4 text-left text-sm font-semibold text-white/90 ${column.className || ""}`}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key as string)}
                      className="flex items-center gap-2 hover:text-electric-400 transition-colors"
                    >
                      {column.header}
                      <div className="flex flex-col">
                        <ChevronUpIcon 
                          className={`h-3 w-3 ${
                            sortColumn === column.key && sortDirection === "asc" 
                              ? "text-electric-400" 
                              : "text-white/30"
                          }`}
                        />
                        <ChevronDownIcon 
                          className={`h-3 w-3 -mt-1 ${
                            sortColumn === column.key && sortDirection === "desc" 
                              ? "text-electric-400" 
                              : "text-white/30"
                          }`}
                        />
                      </div>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item)}
                className={`
                  border-b border-white/5 transition-all duration-200
                  hover:bg-white/10 hover:backdrop-blur-sm
                  ${onRowClick ? "cursor-pointer" : ""}
                  ${index % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}
                `}
              >
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className={`px-6 py-4 text-sm text-white/70 ${column.className || ""}`}
                  >
                    {column.render
                      ? column.render(item[column.key as keyof T], item)
                      : item[column.key as keyof T]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Status Badge Component
export function StatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "active":
      case "completed":
      case "paid":
        return "bg-electric-500/20 text-electric-400 border-electric-500/30";
      case "pending":
      case "in progress":
        return "bg-sunset-500/20 text-sunset-400 border-sunset-500/30";
      case "inactive":
      case "cancelled":
      case "overdue":
        return "bg-magenta-500/20 text-magenta-400 border-magenta-500/30";
      default:
        return "bg-midnight-500/20 text-midnight-400 border-midnight-500/30";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor()}`}>
      {status}
    </span>
  );
}
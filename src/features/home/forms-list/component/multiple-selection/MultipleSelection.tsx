"use client";
import { Button } from "@/components";
import { useState, useEffect, useMemo } from "react";
import { useAllStaffQuery, IStaffItem } from "@/services/apis";

interface MultipleSelectionProps {
  selectedValues?: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  departmentId?: string; // When not provided, staff options should not appear
}

export function MultipleSelection({ 
  selectedValues = [], 
  onChange,
  placeholder = "Select staff members",
  departmentId,
}: MultipleSelectionProps) {
  const { allStaffData, isLoading, isError } = useAllStaffQuery({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedValues);
  const [isOpen, setIsOpen] = useState(false);

  // Sync with parent component when selectedValues prop changes
  useEffect(() => {
    setSelectedOptions(selectedValues);
  }, [selectedValues]);

  // Transform staff data for options
  const staffOptions = useMemo(() => (
    allStaffData?.data?.map((staff: IStaffItem) => ({
      id: staff.id,
      name: `${staff.first_name} ${staff.last_name}`,
      email: staff.email,
      departmentId: (staff as unknown as { department?: { id?: string } })?.department?.id,
    })) || []
  ), [allStaffData]);

  // Filter by selected department when provided
  const filteredStaffOptions = useMemo(
    () => (departmentId ? staffOptions.filter((s) => s.departmentId === departmentId) : []),
    [departmentId, staffOptions]
  );
  const filteredIdsKey = useMemo(
    () => filteredStaffOptions.map((s) => s.id).sort().join("|"),
    [filteredStaffOptions]
  );

  const allSelected = filteredStaffOptions.length > 0 && selectedOptions.length === filteredStaffOptions.length;
  const someSelected = selectedOptions.length > 0 && !allSelected;

  const toggleOption = (staffId: string) => {
    const newSelection = selectedOptions.includes(staffId)
      ? selectedOptions.filter((item) => item !== staffId)
      : [...selectedOptions, staffId];
    
    setSelectedOptions(newSelection);
    onChange?.(newSelection);
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      const newSelection: string[] = [];
      setSelectedOptions(newSelection);
      onChange?.(newSelection);
    } else {
      const newSelection = filteredStaffOptions.map((s) => s.id);
      setSelectedOptions(newSelection);
      onChange?.(newSelection);
    }
  };

  // When department changes, drop selections that are not in that department
  useEffect(() => {
    if (!departmentId) {
      // No department selected: clear selections locally
      if (selectedOptions.length > 0) {
        setSelectedOptions([]);
        onChange?.([]);
      }
      return;
    }
    const validIds = new Set(filteredStaffOptions.map((s) => s.id));
    const pruned = selectedOptions.filter((id) => validIds.has(id));
    if (pruned.length !== selectedOptions.length) {
      setSelectedOptions(pruned);
      onChange?.(pruned);
    }
  }, [departmentId, filteredIdsKey, selectedOptions, onChange, filteredStaffOptions]);

  const clearAll = () => {
    const newSelection: string[] = [];
    setSelectedOptions(newSelection);
    onChange?.(newSelection);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full text-[0.8rem]">
      {/* Dropdown Trigger */}
      <div
        onClick={() => {
          if (!departmentId) return; // disable open until department selected
          toggleDropdown();
        }}
        className={`flex justify-between items-center px-4 py-2 border rounded-md bg-white transition-colors ${
          departmentId
            ? "border-gray-300 cursor-pointer hover:border-blue-500"
            : "border-gray-200 cursor-not-allowed bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-500">
            {!departmentId
              ? "Select department first"
              : isLoading
              ? "Loading staff..."
              : placeholder}
          </span>
          {selectedOptions.length > 0 && (
            <span className="bg-blue-500 text-white text-[0.6rem] px-2 py-1 rounded-full">
              {selectedOptions.length} selected
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown Content */}
      {isOpen && departmentId && (
        <div className="mt-2 border border-gray-300 rounded-lg bg-white shadow-lg z-10 max-h-80 overflow-hidden">
          {/* Search and Status Area */}
          <div className="p-3 border-b border-gray-200">
            {isLoading && (
              <div className="text-sm text-gray-500">Loading staff members...</div>
            )}
            {isError && (
              <div className="text-sm text-red-500">Failed to load staff members</div>
            )}
            {!isLoading && !isError && filteredStaffOptions.length === 0 && (
              <div className="text-sm text-gray-500">No staff members found</div>
            )}
          </div>

          {/* Options List */}
          {!isLoading && filteredStaffOptions.length > 0 && (
            <div className="max-h-48 overflow-y-auto">
              {/* Select All */}
              <div
                onClick={toggleSelectAll}
                className={`flex items-start p-3 cursor-pointer transition-colors ${
                  allSelected ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                    allSelected
                      ? "bg-blue-500 border-blue-500 text-white"
                      : someSelected
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {allSelected ? "✓" : someSelected ? "−" : ""}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">Select all</div>
                  <div className="text-xs text-gray-500 truncate">
                    {filteredStaffOptions.length} staff members
                  </div>
                </div>
              </div>

              {filteredStaffOptions.map((staff) => {
                const isSelected = selectedOptions.includes(staff.id);

                return (
                  <div
                    key={staff.id}
                    onClick={() => toggleOption(staff.id)}
                    className={`flex items-start p-3 cursor-pointer transition-colors ${
                      isSelected ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                        isSelected
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && "✓"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {staff.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {staff.email}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Action Buttons */}
          <div className="p-3 border-t border-gray-200 flex justify-between">
            <button
              onClick={clearAll}
              disabled={selectedOptions.length === 0}
              className={`px-3 py-1 text-sm font-medium rounded ${
                selectedOptions.length === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Clear All
            </button>
            <Button 
              title="Done" 
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
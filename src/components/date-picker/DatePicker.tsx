"use client";
import React, { useRef } from "react";

/**
 * Reusable Date Picker Component
 * @param {string} value - Selected date.
 * @param {(val: string) => void} onChange - Function to handle date change.
 * @param {string | null} [error] - Optional error message.
 */
export function DatePicker({
  placeholder,
  value,
  onChange,
  error,
  label,
  isRequired = false,
  datePickerBorderRadius = "rounded-lg",
  minDate, 
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  datePickerBorderRadius?: string;
  minDate?: Date;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Convert minDate to YYYY-MM-DD format for HTML input
  const minDateString = minDate ? minDate.toISOString().split('T')[0] : undefined;

  return (
    <div className="w-full text-[0.8rem]">
      {label && (
        <label className="block text-gray-700 mb-2 ">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      {/* Date Input */}
      <div className="relative">
        <input
          placeholder={placeholder}
          ref={inputRef}
          type="date"
          min={minDateString} // Past dates disable करने के लिए
          className={`w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } ${datePickerBorderRadius} px-4 py-2 pr-10 focus:outline-none focus:ring-1 ${
            error ? "focus:ring-red-500" : "focus:ring-primary"
          } ${minDate && value && new Date(value) < minDate ? 'bg-gray-100 text-gray-500' : ''}`}
          value={value}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            // अगर selected date minDate से पहले है तो onChange नहीं call करें
            if (minDate && selectedDate < minDate) {
              return;
            }
            onChange(e.target.value);
          }}
        />
        {/* Custom Calendar Icon (Now Works on All Browsers) */}
        <div
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          onClick={() =>
            inputRef.current?.showPicker?.() || inputRef.current?.focus()
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 012 0v1h4V2a1 1 0 112 0v1h1a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h1V2zm10 4H4v10a1 1 0 001 1h10a1 1 0 001-1V6zm-8 3a1 1 0 012 0v3a1 1 0 01-2 0V9zm4 0a1 1 0 012 0v3a1 1 0 01-2 0V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
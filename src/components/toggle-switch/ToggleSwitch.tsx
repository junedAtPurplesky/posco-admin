// components/ToggleSwitch.tsx
import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * ToggleSwitch component
 * @param checked - boolean state of the switch
 * @param onChange - callback when toggled
 * @param label - optional label displayed next to the switch
 * @param disabled - optional boolean to disable switch
 * @param className - optional additional styling
 */
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div
        className={`relative w-11 h-6 transition duration-200 ease-in-out ${
          checked ? "bg-primary" : "bg-gray-300"
        } rounded-full`}
        onClick={() => !disabled && onChange(!checked)}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      {label && <span className="text-gray-700 text-sm">{label}</span>}
    </label>
  );
};

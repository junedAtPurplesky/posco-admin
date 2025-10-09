import { TIconProps } from "@/constants";

// FilterIcon component renders a hamburger menu icon as an SVG.
export function FilterIcon({
  className = "w-full h-full",
  color = "#0B7AB5",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4C2 3.17157 2.67157 2.5 3.5 2.5C4.32843 2.5 5 3.17157 5 4C5 4.82843 4.32843 5.5 3.5 5.5C2.67157 5.5 2 4.82843 2 4ZM3.5 0.5C1.567 0.5 0 2.067 0 4C0 5.933 1.567 7.5 3.5 7.5C5.433 7.5 7 5.933 7 4C7 2.067 5.433 0.5 3.5 0.5ZM9 5H17V3H9V5ZM13 14C13 13.1716 13.6716 12.5 14.5 12.5C15.3284 12.5 16 13.1716 16 14C16 14.8284 15.3284 15.5 14.5 15.5C13.6716 15.5 13 14.8284 13 14ZM14.5 10.5C12.567 10.5 11 12.067 11 14C11 15.933 12.567 17.5 14.5 17.5C16.433 17.5 18 15.933 18 14C18 12.067 16.433 10.5 14.5 10.5ZM1 13V15H9V13H1Z"
        fill={color}
      />
    </svg>
  );
}

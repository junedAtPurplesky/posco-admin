import { TIconProps } from "@/constants";

// PlusIcon component renders a hamburger menu icon as an SVG.
export function PlusIcon({
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
        d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8 8H4V10H8V14H10V10H14V8H10V4H8V8Z"
        fill={color}
      />
    </svg>
  );
}

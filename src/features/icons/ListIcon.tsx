import { TIconProps } from "@/constants";

// ListIcon component renders a hamburger menu icon as an SVG.
export function ListIcon({
  className = "w-full h-full",
  color = "white",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 20H1C0.44772 20 0 19.5523 0 19V1C0 0.44772 0.44772 0 1 0H17C17.5523 0 18 0.44772 18 1V19C18 19.5523 17.5523 20 17 20ZM16 18V2H2V18H16ZM5 5H13V7H5V5ZM5 9H13V11H5V9ZM5 13H13V15H5V13Z"
        fill={color}
      />
    </svg>
  );
}

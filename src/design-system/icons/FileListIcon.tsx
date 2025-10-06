import { TIconProps } from "@/constants";

// MenuIcon component renders a hamburger menu icon as an SVG.
export function FileListIcon({
  className = "w-full h-full",
  color = "#303030",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_47_2834)">
        <path
          d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM8 7H16V9H8V7ZM8 11H16V13H8V11ZM8 15H16V17H8V15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_47_2834">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

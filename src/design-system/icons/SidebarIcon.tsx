import { TIconProps } from "@/constants";

export function SidebarIcon({
  className = "w-full h-full",
  color = "#0B7AB5",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4_4220)">
        <path
          d="M7.08333 7.08333H18.4167V26.9167H7.08333V7.08333ZM26.9167 26.9167H21.25V7.08333H26.9167V26.9167ZM5.66667 4.25C4.88427 4.25 4.25 4.88427 4.25 5.66667V28.3333C4.25 29.1158 4.88427 29.75 5.66667 29.75H28.3333C29.1158 29.75 29.75 29.1158 29.75 28.3333V5.66667C29.75 4.88427 29.1158 4.25 28.3333 4.25H5.66667ZM9.91667 17L15.5833 12.0417V21.9583L9.91667 17Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_4_4220">
          <rect width="34" height="34" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

import {
  DashboardIcon,
  FileListIcon,
  FileListingIcon,
  StaffIcon,
} from "@/design-system";
import { ReactNode } from "react";

/**
 * Interface representing a sidebar link in the admin panel.
 */
export interface IAdminSidebarLink {
  /** The navigation path for the sidebar link. */
  path: string;
  /** The display name of the sidebar link. */
  name: string;
  /** The icon displayed when the link is inactive. */
  icon: ReactNode;
  /** The icon displayed when the link is active. */
  activeIcon: ReactNode;
}

/**
 * Props for the Admin Sidebar Layout component.
 */
export interface IAdminSidebarLayoutProps {
  /** The child components rendered within the layout. */
  children: React.ReactNode;
  /** The list of sidebar links for the admin panel. */
  adminSidebarLinks: IAdminSidebarLink[];
}

/**
 * Array containing the sidebar navigation links for the admin panel.
 */
export const adminSidebarLinks: IAdminSidebarLink[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon />,
    activeIcon: <DashboardIcon color="#0B7AB5" />,
  },
  {
    path: "/staff-management",
    name: "Staff Management",
    icon: <StaffIcon />,
    activeIcon: <StaffIcon color="#0B7AB5" />,
  },
  {
    path: "/submitted-forms",
    name: "Submitted Forms",
    icon: <FileListIcon />,
    activeIcon: <FileListIcon color="#0B7AB5" />,
  },
  {
    path: "/forms-list",
    name: "Forms List",
    icon: <FileListingIcon />,
    activeIcon: <FileListingIcon color="#0B7AB5" />,
  },
];

import type { Dispatch, SetStateAction } from "react";

export type StaffOutletContext = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
};

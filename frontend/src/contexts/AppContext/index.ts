import React from "react";
import type { APIResponse, AppData } from "../../lib/types";

export type AppDataContext = {
  appData: AppData | null;
  loading: boolean;
  fetchAppData: () => Promise<APIResponse<AppData> | null>;
};

export const AppContext = React.createContext<AppDataContext | null>(null);

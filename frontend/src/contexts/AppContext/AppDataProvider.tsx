import React from "react";
import { useAPI } from "../../hooks/useAPI";
import { appDataSchema } from "../../lib/schemas";
import { AppContext, type AppDataContext } from ".";

export default function AppDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading, fetchData } = useAPI(appDataSchema);

  const value: AppDataContext = {
    appData: data != null && "data" in data ? data.data : null,
    loading,
    fetchAppData: () => fetchData("/api/app-data"),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

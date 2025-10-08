import { useContext } from "react";
import { AppContext } from ".";

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContext provider");
  }
  return context;
}

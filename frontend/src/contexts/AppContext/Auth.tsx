import { useEffect } from "react";
import { useAppContext } from "./useAppContext";

export default function Auth({ children }: { children: React.ReactNode }) {
  const { appData, loading, fetchAppData } = useAppContext();

  useEffect(() => {
    fetchAppData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!appData) {
    return (
      <div>
        Unauthorized. Please log in: <a href="/login">Login</a>
      </div>
    );
  }

  return children;
}

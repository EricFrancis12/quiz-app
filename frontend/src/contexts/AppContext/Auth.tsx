import { useEffect } from "react";
import { useAppContext } from "./useAppContext";
import { Link } from "react-router-dom";

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
        Unauthorized. Please log in: <Link to="/login">Login</Link>
      </div>
    );
  }

  return children;
}

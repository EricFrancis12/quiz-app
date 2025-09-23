import { useEffect, useState } from "react";

interface AppData {
  [key: string]: unknown;
}

export default function DashboardPage() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const response = await fetch("/api/app-data", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (unauthorized) {
    return (
      <div>
        <h2>Unauthorized</h2>
        <p>You need to login to access this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>App Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

import { useEffect, useState } from "react";
import { fmtErr } from "../lib/utils";

type FetchOptions<T> = {
  initialState?: T | null;
  onSuccess?: (data: T) => void;
  onError?: (err: Error) => void;
};

export function useFetch<T>(
  url: string,
  verify: (u: unknown) => u is T,
  { initialState, onSuccess, onError }: FetchOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(initialState ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchData(
    options?: RequestInit & { url?: string }
  ): Promise<T | null> {
    if (loading) return null;

    setLoading(true);
    setError(null);

    let fetchedData: T | null = null;

    try {
      const response = await fetch(options?.url || url, options);
      if (!response.ok) {
        throw new Error("Expected 200 OK, but got " + response.status);
      }

      const data = await response.json();
      if (!verify(data)) {
        throw new Error("Response data did not match expected format");
      }

      fetchedData = data;
      setData(fetchedData);
      if (onSuccess) onSuccess(fetchedData);
    } catch (err) {
      const error = fmtErr(err);
      setError(error);
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }

    return fetchedData;
  }

  return { data, loading, error, fetchData };
}

export function useFetchOnMount<T>(
  url: string,
  verify: (u: unknown) => u is T,
  options: FetchOptions<T> = {}
) {
  const { data, loading, error, fetchData } = useFetch(url, verify, options);

  useEffect(() => {
    fetchData();
  });

  return { data, loading, error, fetchData };
}

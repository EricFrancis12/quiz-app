import { useEffect, useState } from "react";
import { z } from "zod";
import { fmtErr } from "../lib/utils";

export type FetchOptions<T> = {
  initialState?: T | null;
  disableStatusCodeError?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (err: Error) => void;
};

export type FetchDataOptions = RequestInit & { url?: string };

export function useFetch<T>(
  schema: z.ZodType<T>,
  {
    initialState,
    disableStatusCodeError,
    onSuccess,
    onError,
  }: FetchOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(initialState ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData(
    url: string,
    options?: FetchDataOptions
  ): Promise<T | null> {
    if (loading) return null;

    setLoading(true);
    setError("");

    let fetchedData: T | null = null;

    try {
      const response = await fetch(options?.url || url, options);
      if (!disableStatusCodeError && !response.ok) {
        throw new Error("Expected 200 OK, but got " + response.status);
      }

      const data = await response.json();
      const result = schema.safeParse(data);
      if (!result.success) {
        throw new Error("Response data did not match expected format");
      }

      fetchedData = result.data;
      setData(fetchedData);
      if (onSuccess) onSuccess(fetchedData);
    } catch (err) {
      const error = fmtErr(err);
      setError(error.message);
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }

    return fetchedData;
  }

  return { data, setData, loading, error, setError, fetchData };
}

export function useFetchOnMount<T>(
  url: string,
  schema: z.ZodType<T>,
  options: FetchOptions<T> = {}
) {
  const obj = useFetch(schema, options);

  useEffect(() => {
    obj.fetchData(url);
  }, []);

  return obj;
}

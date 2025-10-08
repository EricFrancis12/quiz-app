import { useEffect } from "react";
import { z } from "zod";
import { useFetch, type FetchOptions } from "./useFetch";
import type { APIResponse } from "../lib/types";
import { apiResponseSchema } from "../lib/schemas";

export function useAPI<T>(
  url: string,
  schema: z.ZodType<T>,
  options: FetchOptions<APIResponse<T>> = {}
) {
  return useFetch(url, apiResponseSchema(schema), options);
}

export function useAPIOnMount<T>(
  url: string,
  schema: z.ZodType<T>,
  options: FetchOptions<APIResponse<T>> = {}
) {
  const obj = useFetch(url, apiResponseSchema(schema), options);

  useEffect(() => {
    obj.fetchData();
  });

  return obj;
}

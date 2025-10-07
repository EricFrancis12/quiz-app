export function fmtErr(err: unknown, msg?: string): Error {
  if (err instanceof Error) return err;
  if (err === "string") return new Error(err);
  return new Error(msg ?? "An unknown error occurred");
}

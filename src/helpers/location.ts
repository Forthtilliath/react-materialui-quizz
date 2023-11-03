export function generateURL(
  origin: string,
  args: Record<string, boolean | string | number | string[] | number[]>
) {
  const url = new URL(origin, origin.startsWith("/") ? document.location.href : undefined);

  Object.entries(args).flatMap(([key, values]) =>
    Array.isArray(values)
      ? values.map((value) => url.searchParams.append(key, value.toString()))
      : url.searchParams.append(key, values.toString())
  );

  return url.toString();
}

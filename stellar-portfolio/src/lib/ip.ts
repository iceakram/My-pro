export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    // could be a comma-separated list
    const ip = xff.split(",")[0].trim();
    if (ip) return ip;
  }
  const xr = headers.get("x-real-ip");
  if (xr) return xr;
  // As a last resort
  return "0.0.0.0";
}

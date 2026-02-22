const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000; // 1 minute

const cache = new Map<string, { count: number; expires: number }>();

export function rateLimit(ip: string) {
  const now = Date.now();
  const userData = cache.get(ip);

  if (!userData || now > userData.expires) {
    cache.set(ip, { count: 1, expires: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (userData.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  userData.count += 1;
  return { success: true, remaining: MAX_REQUESTS - userData.count };
}

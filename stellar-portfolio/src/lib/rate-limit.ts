// Simple in-memory rate limiter (works for single-process deployments)
// For serverless, use a persistent store (e.g., Upstash Redis).

type Bucket = { tokens: number; last: number };

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_TOKENS = 5; // 5 requests per window

const buckets = new Map<string, Bucket>();

export function rateLimitAllow(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: RATE_LIMIT_TOKENS, last: now };
  // refill tokens
  const elapsed = now - bucket.last;
  const refill = Math.floor(elapsed / (RATE_LIMIT_WINDOW_MS / RATE_LIMIT_TOKENS));
  bucket.tokens = Math.min(RATE_LIMIT_TOKENS, bucket.tokens + (refill > 0 ? refill : 0));
  if (refill > 0) {
    bucket.last = now;
  }
  const allowed = bucket.tokens > 0;
  if (allowed) bucket.tokens -= 1;
  buckets.set(key, bucket);
  return { allowed, remaining: bucket.tokens };
}

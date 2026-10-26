import crypto from 'crypto';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory token store for serverless instances
const tracker = new Map<string, RateLimitRecord>();

// Clean up expired tokens periodically
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, record] of tracker.entries()) {
    if (record.resetAt <= now) {
      tracker.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
}

/**
 * Anonymize client IP using SHA-256 with a salt so raw IPs are never logged or stored.
 */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || 'velmora_b2b_salt_2026';
  return crypto.createHash('sha256').update(`${ip}:${salt}`).digest('hex').substring(0, 32);
}

/**
 * Simple in-memory sliding window rate limiter.
 * Default: 5 requests per 10 minutes.
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): RateLimitResult {
  cleanup();
  const now = Date.now();
  const record = tracker.get(identifier);

  if (!record || record.resetAt <= now) {
    tracker.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetSeconds: Math.ceil((record.resetAt - now) / 1000),
  };
}

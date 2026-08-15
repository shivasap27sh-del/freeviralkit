import { Redis } from '@upstash/redis';

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface JobRecord<T = unknown> {
  id: string;
  type: string;
  status: JobStatus;
  result?: T;
  error?: string;
  createdAt: number;
}

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    return new Redis({ url, token });
  } catch (e) {
    return null;
  }
}

/**
 * Creates a new queue job in Upstash Redis.
 * Expires automatically after 10 minutes (600 seconds).
 */
export async function createJob(type: string): Promise<string> {
  const id = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const redis = getRedis();
  
  if (redis) {
    const record: JobRecord = {
      id,
      type,
      status: 'pending',
      createdAt: Date.now(),
    };
    await redis.set(`job:${id}`, JSON.stringify(record), { ex: 600 }).catch(() => {});
  }

  return id;
}

/**
 * Retrieves the current status and payload of a queue job.
 */
export async function getJobStatus<T = unknown>(id: string): Promise<JobRecord<T> | null> {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const raw = await redis.get<string | JobRecord<T>>(`job:${id}`);
    if (!raw) return null;
    if (typeof raw === 'string') {
      return JSON.parse(raw) as JobRecord<T>;
    }
    return raw as JobRecord<T>;
  } catch {
    return null;
  }
}

/**
 * Updates a job's status and result in Redis.
 */
export async function updateJob<T = unknown>(
  id: string,
  status: JobStatus,
  result?: T,
  error?: string
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  try {
    const existing = await getJobStatus(id);
    const updated: JobRecord<T> = {
      id,
      type: existing?.type || 'unknown',
      status,
      result: result !== undefined ? result : (existing?.result as T),
      error: error !== undefined ? error : existing?.error,
      createdAt: existing?.createdAt || Date.now(),
    };
    await redis.set(`job:${id}`, JSON.stringify(updated), { ex: 600 }).catch(() => {});
  } catch (e) {
    console.error(`[Queue] Failed to update job ${id}:`, e);
  }
}

/**
 * Publishes a task message to Upstash QStash endpoint.
 */
export async function publishQStashMessage(destinationUrl: string, payload: Record<string, unknown>): Promise<boolean> {
  const token = process.env.QSTASH_TOKEN;
  const baseUrl = process.env.QSTASH_URL || 'https://qstash-us-east-1.upstash.io';
  if (!token) return false;

  try {
    const res = await fetch(`${baseUrl}/v2/publish/${destinationUrl}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (err) {
    console.error('[QStash] Publish error:', err);
    return false;
  }
}

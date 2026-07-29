'use server';

import { getJobStatus, JobRecord } from '@/lib/queue';

export async function checkQueueJobStatus<T = any>(jobId: string): Promise<{ success: boolean; job?: JobRecord<T>; error?: string }> {
  if (!jobId || typeof jobId !== 'string') {
    return { success: false, error: 'Invalid Job ID' };
  }

  const job = await getJobStatus<T>(jobId);
  if (!job) {
    return { success: false, error: 'Job not found or expired.' };
  }

  return { success: true, job };
}

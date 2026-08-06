import { execFileSync } from 'node:child_process';

export class SourceHistoryError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, cause === undefined ? undefined : { cause });
    this.name = 'SourceHistoryError';
  }
}

function normalizeSourcePath(sourceFile: string): string {
  return sourceFile.replaceAll('\\', '/');
}

function readGitHistory(sourceFiles: readonly string[]): string {
  try {
    const safeDirectory = normalizeSourcePath(process.cwd());
    return execFileSync(
      'git',
      ['-c', `safe.directory=${safeDirectory}`, 'log', '--format=%ct', '--name-only', '--', ...sourceFiles],
      { cwd: process.cwd(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
    );
  } catch (error) {
    throw new SourceHistoryError('Unable to read Git history for sitemap source files.', error);
  }
}

function parseGitHistory(history: string, sourceFiles: ReadonlySet<string>): Map<string, Date> {
  const sourceDates = new Map<string, Date>();
  let commitDate: Date | undefined;

  for (const line of history.split(/\r?\n/)) {
    const value = line.trim();
    if (!value) continue;

    if (/^\d+$/.test(value)) {
      const parsedDate = new Date(Number(value) * 1000);
      if (Number.isNaN(parsedDate.getTime())) {
        throw new SourceHistoryError(`Git returned an invalid commit timestamp: ${value}`);
      }
      commitDate = parsedDate;
      continue;
    }

    const sourceFile = normalizeSourcePath(value);
    if (commitDate && sourceFiles.has(sourceFile) && !sourceDates.has(sourceFile)) {
      sourceDates.set(sourceFile, commitDate);
    }
  }

  return sourceDates;
}

// Git dates remain stable across deployment checkouts, unlike checkout file modification times.
export function getSourceLastModifiedDates(sourceFiles: readonly string[]): ReadonlyMap<string, Date> {
  const normalizedFiles = [...new Set(sourceFiles.map(normalizeSourcePath))];
  if (normalizedFiles.length === 0) {
    throw new SourceHistoryError('At least one sitemap source file is required.');
  }

  const sourceFileSet = new Set(normalizedFiles);
  const sourceDates = parseGitHistory(readGitHistory(normalizedFiles), sourceFileSet);

  const missingSourceFiles = normalizedFiles.filter((sourceFile) => !sourceDates.has(sourceFile));
  if (missingSourceFiles.length > 0) {
    // Fallback to current date for newly created uncommitted files during local builds
    const now = new Date();
    for (const file of missingSourceFiles) {
      sourceDates.set(file, now);
    }
  }

  return sourceDates;
}

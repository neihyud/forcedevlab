async function safeExecute<T>(callback: () => Promise<T> | T): Promise<T>;
async function safeExecute<T, E>(
  callback: () => Promise<T> | T,
  defaultReturn: E,
  options?: {
    log?: boolean;
    notify?: boolean;
    message?: string;
  },
): Promise<T | E>;
async function safeExecute<T, E>(
  callback: () => Promise<T> | T,
  defaultReturn?: E,
  options?: {
    log?: boolean;
    notify?: boolean;
    message?: string;
  },
): Promise<T | E | undefined> {
  const log = options?.log ?? true;
  const notify = options?.notify ?? false;

  try {
    return await callback();
  } catch (err: unknown) {
    if (log) {
      console.log("\x1b[34merror\x1b[0m", err);
      console.log("\x1b[32m-------------------------------------------");
    }

    if (typeof window !== "undefined" && notify && (err as Error).message) {
      console.log("\x1b[34merror\x1b[0m", {
        message: options?.message ?? (err as Error).message,
      });
      console.log("\x1b[32m-------------------------------------------");
    }

    return defaultReturn;
  }
}

export default safeExecute;

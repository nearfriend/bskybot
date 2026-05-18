export async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 1000): Promise<T> {
  let error: unknown
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fn()
    } catch (err) {
      error = err
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempt))
      }
    }
  }
  throw error
}

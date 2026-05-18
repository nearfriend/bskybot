import { sleep } from '../utils/sleep'

let lastActionTimestamp = 0

export async function throttle(minimumMs: number) {
  const now = Date.now()
  const elapsed = now - lastActionTimestamp
  if (elapsed < minimumMs) {
    await sleep(minimumMs - elapsed)
  }
  lastActionTimestamp = Date.now()
}

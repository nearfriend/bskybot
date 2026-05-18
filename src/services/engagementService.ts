import { randomDelay } from '../utils/random'
import { sleep } from '../utils/sleep'

export async function waitForHumanTiming() {
  const delayMs = randomDelay(3000, 9000)
  await sleep(delayMs)
}

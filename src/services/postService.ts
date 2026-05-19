import { publishNewPost } from '../bluesky/posts'
import { generatePost } from './contentService'
import { waitForHumanTiming } from './engagementService'
import { throttle } from '../core/rateLimiter'
import { logger } from '../core/logger'

export async function publishPost() {
  // await throttle(7000)
  const text = await generatePost()
  await publishNewPost(text)
  logger.info({ text }, 'Post published')
  // await waitForHumanTiming()
}

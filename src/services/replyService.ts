import { fetchRandomTimelinePost, resolveReplyReferences, replyToPost, pickRandomImageUrl } from '../bluesky/replies'
import { generateReply } from './contentService'
import { waitForHumanTiming } from './engagementService'
import { throttle } from '../core/rateLimiter'
import { env } from '../config/env'
import { randomChance } from '../utils/random'
import { logger } from '../core/logger'

export async function replyToRandomTimelinePost() {
  if (!randomChance(env.REPLY_CHANCE)) {
    logger.info('Skipping random reply this cycle')
    return
  }

  const target = await fetchRandomTimelinePost()
  if (!target) {
    logger.info('No timeline post available for reply')
    return
  }

  await waitForHumanTiming()
  await throttle(5000)

  const references = await resolveReplyReferences(target)
  const text = await generateReply(target.authorHandle || 'there')
  const imageUrl = randomChance(env.IMAGE_CHANCE) ? pickRandomImageUrl() : undefined

  // await replyToPost({
  //   text,
  //   ...references,
  //   imageUrl
  // })

  logger.info({ uri: target.uri, cid: target.cid, text, imageUrl }, 'Reply posted to timeline post')
}

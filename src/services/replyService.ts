import { fetchRandomTimelinePost, resolveReplyReferences, replyToPost } from '../bluesky/replies'
import { generateReply } from './contentService'
import { generateImage } from '../ai/openai'
import { buildReplyImagePrompt } from '../ai/prompts'
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
  const imageData = await generateImage(buildReplyImagePrompt(target.authorHandle || 'there', text))

  await replyToPost({
    text,
    ...references,
    imageData
  })

  logger.info({ uri: target.uri, cid: target.cid, text, hasImage: !!imageData }, 'Reply posted to timeline post')
}

import { publishNewPost } from '../bluesky/posts'
import { generatePost, generatePostFromAI } from './contentService'
import { generateImage } from '../ai/openai'
import { buildPostImagePrompt } from '../ai/prompts'
import { waitForHumanTiming } from './engagementService'
import { throttle } from '../core/rateLimiter'
import { logger } from '../core/logger'

export async function publishPost() {
  await waitForHumanTiming()
  await throttle(7000)
  const text = await generatePost()
  await publishNewPost(text)
  logger.info({ text, hasImage: false }, 'Post published')
  // const text = await generatePostFromAI()
  // const imageData = await generateImage(buildPostImagePrompt(text))
  // await publishNewPost(text, imageData)
  // logger.info({ text, hasImage: !!imageData }, 'Post published')
}

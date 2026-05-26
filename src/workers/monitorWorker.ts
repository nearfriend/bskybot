import { replyToRandomTimelinePost } from '../services/replyService'
import { logger } from '../core/logger'

export async function monitorMentions() {
  await replyToRandomTimelinePost()
  logger.info('Random reply pass completed')
}

import cron from 'node-cron'
import { publishPost } from '../services/postService'
import { monitorMentions } from '../workers/monitorWorker'
import { env } from '../config/env'
import { logger } from './logger'

export function startScheduler() {
  cron.schedule(env.POST_CRON_SCHEDULE, async () => {
    logger.info('Running scheduled post job')
    await publishPost().catch((error) => {
      logger.error({ err: error }, 'Post scheduler failed')
    })
  })

  cron.schedule(env.MENTION_CRON_SCHEDULE, async () => {
    logger.info('Running scheduled reply job')
    await monitorMentions().catch((error) => {
      logger.error({ err: error }, 'Reply scheduler failed')
    })
  })
}

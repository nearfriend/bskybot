import cron from 'node-cron'
import { publishPost } from '../services/postService'
import { env } from '../config/env'
import { logger } from './logger'

export function startScheduler() {
  cron.schedule(env.POST_CRON_SCHEDULE, async () => {
    logger.info('Running scheduled post job')
    await publishPost().catch((error) => {
      logger.error({ err: error }, 'Post scheduler failed')
    })
  })
}

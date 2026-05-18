import { login } from './bluesky/auth'
import { startScheduler } from './core/scheduler'
import { logger } from './core/logger'

async function bootstrap() {
  try {
    await login()
    startScheduler()
    logger.info('Bot started')
  } catch (error) {
    logger.error({ err: error }, 'Failed to start bot')
    process.exit(1)
  }
}

bootstrap()

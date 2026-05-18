import { agent } from './client'
import { env } from '../config/env'
import { logger } from '../core/logger'

export async function login() {
  logger.info('Logging into Bluesky as %s', env.BLUESKY_IDENTIFIER)
  await agent.login({
    identifier: env.BLUESKY_IDENTIFIER,
    password: env.BLUESKY_PASSWORD
  })
}

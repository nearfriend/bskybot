import dotenv from 'dotenv'

dotenv.config()

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function parseList(value?: string): string[] {
  return value
    ? value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    : []
}

function parseFloatOrDefault(value: string | undefined, defaultValue: number) {
  const parsed = value ? Number.parseFloat(value) : NaN
  return Number.isFinite(parsed) ? parsed : defaultValue
}

export const env = {
  BLUESKY_IDENTIFIER: getRequiredEnv('BLUESKY_IDENTIFIER'),
  BLUESKY_PASSWORD: getRequiredEnv('BLUESKY_PASSWORD'),
  OPENAI_API_KEY: getRequiredEnv('OPENAI_API_KEY'),
  POST_CRON_SCHEDULE: process.env.POST_CRON_SCHEDULE || '0 */2 * * *',
  MENTION_CRON_SCHEDULE: process.env.MENTION_CRON_SCHEDULE || '*/5 * * * *',
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  POST_TOPICS: process.env.POST_TOPICS || 'AI development, software engineering, developer productivity, programming careers, web3 trends',
  REPLY_CHANCE: parseFloatOrDefault(process.env.REPLY_CHANCE, 0.33),
  IMAGE_CHANCE: parseFloatOrDefault(process.env.IMAGE_CHANCE, 0.2),
  IMAGE_URLS: parseList(process.env.IMAGE_URLS)
}

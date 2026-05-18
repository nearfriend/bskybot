import { env } from './env'

export const MAX_POST_LENGTH = 250

export const defaultPostTopics = env.POST_TOPICS
  .split(',')
  .map((topic) => topic.trim())
  .filter(Boolean)

export const fallbackPostTopics = [
  'AI development',
  'software engineering',
  'developer productivity',
  'web3 trends',
  'remote developer workflows'
]

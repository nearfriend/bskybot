import { openai } from '../ai/openai'
import { buildPostPrompt, buildReplyPrompt } from '../ai/prompts'
import { defaultPostTopics, MAX_POST_LENGTH } from '../config/constants'
import { env } from '../config/env'
import { pickRandom } from '../utils/random'
import { isTextSafe } from './moderationService'

function trimToLength(text: string, maxLength: number) {
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) {
    return trimmed
  }
  return trimmed.slice(0, maxLength).replace(/\s+$/u, '')
}

export async function generatePost(topic?: string) {
  const chosenTopic = topic || pickRandom(defaultPostTopics)
  const completion = await openai.chat.completions.create({
    model: env.OPENAI_MODEL,
    messages: [
      {
        role: 'user',
        content: buildPostPrompt(chosenTopic)
      }
    ]
  })

  const content = completion.choices[0].message?.content?.trim() || ''
  const safe = await isTextSafe(content)
  if (!safe) {
    throw new Error('Generated post failed moderation checks')
  }

  return trimToLength(content, MAX_POST_LENGTH)
}

export async function generateReply(targetHandle: string) {
  const completion = await openai.chat.completions.create({
    model: env.OPENAI_MODEL,
    messages: [
      {
        role: 'user',
        content: buildReplyPrompt(targetHandle)
      }
    ]
  })

  const content = completion.choices[0].message?.content?.trim() || ''
  const safe = await isTextSafe(content)
  if (!safe) {
    throw new Error('Generated reply failed moderation checks')
  }

  return trimToLength(content, MAX_POST_LENGTH)
}

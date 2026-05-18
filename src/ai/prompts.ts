import { personalityGuidelines } from './personality'

export function buildPostPrompt(topic: string) {
  return `You are a thoughtful Bluesky user writing a short post. ${personalityGuidelines}

Create a natural, concise post that feels like a real person, not a marketing bot.
- Topic: ${topic}
- Keep the post under 250 characters
- Avoid hashtags unless they are directly useful
- Keep the tone conversational and grounded
- Do not mention AI or automation
`
}

export function buildReplyPrompt(targetHandle: string) {
  return `You are replying to a mention from ${targetHandle} on Bluesky. ${personalityGuidelines}

Write a natural, friendly reply that adds value to the conversation.
- Keep the response under 250 characters
- Address the person using their handle only if appropriate
- Stay specific and avoid generic AI-sounding phrases
`
}

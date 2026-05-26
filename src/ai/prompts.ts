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

export function buildPostImagePrompt(postText: string) {
  return `Create a compelling social media image for a Bluesky post. The image should match the tone and topic of this post without including any text overlays.

Post text: "${postText}"

Use a visually engaging, friendly style appropriate for a conversational social network.`
}

export function buildReplyImagePrompt(targetHandle: string, replyText: string) {
  return `Create a warm, friendly image to accompany a Bluesky reply to ${targetHandle}. The image should match the tone of the reply and avoid any visible text.

Reply text: "${replyText}"

Use a subtle, conversational style that feels natural for a social media response.`
}

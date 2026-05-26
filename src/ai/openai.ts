import OpenAI from 'openai'
import { env } from '../config/env'

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
})

export async function generateImage(prompt: string) {
  const response = await openai.images.generate({
    model: env.OPENAI_IMAGE_MODEL,
    prompt,
    size: env.OPENAI_IMAGE_SIZE as '1024x1024' | '512x512' | '256x256' | '1536x1024' | '1024x1536' | '1792x1024' | '1024x1792' | 'auto',
    response_format: 'b64_json'
  })

  const base64 = response.data?.[0]?.b64_json
  if (!base64) {
    throw new Error('OpenAI did not return image data')
  }

  return Buffer.from(base64, 'base64')
}

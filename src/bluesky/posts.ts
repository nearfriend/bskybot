import { agent } from './client'

export async function publishNewPost(text: string) {
  await agent.post({ text })
}

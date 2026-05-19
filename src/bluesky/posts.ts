import { agent } from './client'

export async function publishNewPost(text: string) {
  console.log('Publishing new post', { text })
  try {
    await agent.post({
      $type: 'app.bsky.feed.post',
      text: text
    })
  } catch (error) {
    console.log('Error publishing post', { error })
    throw error
  }
}

import { agent } from './client'

export async function publishNewPost(text: string) {
  console.log('Publishing new post', { text })
  await agent.post({
    $type: 'app.bsky.feed.post',
    text: text
  })
}

import { agent } from './client'

function buildImageEmbed(blob: any) {
  return {
    $type: 'app.bsky.embed.images',
    images: [
      {
        $type: 'app.bsky.embed.images#image',
        image: blob,
        alt: 'Visual content for this post'
      }
    ]
  }
}

export async function publishNewPost(text: string, imageData?: Buffer) {
  const record: any = { text }

  if (imageData) {
    const blob = await agent.uploadBlob(imageData, { encoding: 'image/png' })
    record.embed = buildImageEmbed(blob)
  }

  await agent.post(record)
}

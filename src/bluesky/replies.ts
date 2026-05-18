import { agent } from './client'
import { env } from '../config/env'
import { logger } from '../core/logger'
import { pickRandom } from '../utils/random'

export interface ReplyTarget {
  uri: string
  cid: string
  authorHandle?: string
}

export interface ReplyPayload {
  text: string
  rootUri: string
  rootCid: string
  parentUri: string
  parentCid: string
  imageUrl?: string
}

function isThreadViewPost(value: any): boolean {
  return value && typeof value === 'object' && value.post && 'uri' in value.post
}

function getThreadRoot(thread: any) {
  let current = thread
  let root = thread.post

  while (current.parent && isThreadViewPost(current.parent)) {
    root = current.parent.post
    current = current.parent
  }

  return root
}

export async function fetchRandomTimelinePost() {
  const timeline = await agent.getTimeline({ limit: 50 })
  const feedItems = timeline.data.feed || []
  const ownDid = agent.session?.did

  const posts = feedItems
    .filter((item: any) => item.post && item.post.author?.did !== ownDid)
    .map((item: any) => item.post)
    .filter((post: any) => post.uri && post.cid && post.record)

  if (!posts.length) {
    return null
  }

  const selected = pickRandom(posts)
  return {
    uri: selected.uri,
    cid: selected.cid,
    authorHandle: selected.author?.handle || 'there'
  }
}

export async function resolveReplyReferences(target: ReplyTarget) {
  const threadResponse = await agent.getPostThread({ uri: target.uri, depth: 10 })
  const thread = threadResponse.data.thread
  if (!thread || !thread.post) {
    throw new Error('Unable to resolve thread for reply target')
  }

  const rootPost = getThreadRoot(thread)
  return {
    rootUri: rootPost.uri,
    rootCid: rootPost.cid,
    parentUri: target.uri,
    parentCid: target.cid
  }
}

async function uploadImage(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status}`)
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg'
  const buffer = Buffer.from(await response.arrayBuffer())
  const result = await agent.uploadBlob(buffer, { encoding: contentType })
  return result.data.blob
}

function buildImageEmbed(blob: any) {
  return {
    $type: 'app.bsky.embed.images',
    images: [
      {
        $type: 'app.bsky.embed.images#image',
        image: blob,
        alt: 'Relevant visual content for this reply'
      }
    ]
  }
}

export async function replyToPost(payload: ReplyPayload) {
  const record: any = {
    text: payload.text,
    reply: {
      root: {
        uri: payload.rootUri,
        cid: payload.rootCid
      },
      parent: {
        uri: payload.parentUri,
        cid: payload.parentCid
      }
    }
  }

  if (payload.imageUrl && env.IMAGE_URLS.length) {
    try {
      const blob = await uploadImage(payload.imageUrl)
      record.embed = buildImageEmbed(blob)
    } catch (error) {
      logger.warn({ err: error, imageUrl: payload.imageUrl }, 'Unable to attach image; posting text-only reply')
    }
  }

  return agent.post(record)
}

export function pickRandomImageUrl() {
  if (!env.IMAGE_URLS.length) {
    return undefined
  }
  return pickRandom(env.IMAGE_URLS)
}

import { promises as fs } from 'fs'
import path from 'path'
import { MAX_POST_LENGTH } from '../config/constants'
import { pickRandom } from '../utils/random'
import { isTextSafe } from './moderationService'

type PostEntry = {
  title: string
  content: string
}

const postsJsonPath = path.resolve(process.cwd(), 'src', 'posts.json')
const postedPostsPath = path.resolve(process.cwd(), 'src', 'postedPosts.json')
let cachedPosts: PostEntry[] | null = null

function trimToLength(text: string, maxLength: number) {
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) {
    return trimmed
  }
  return trimmed.slice(0, maxLength).replace(/\s+$/u, '')
}

async function loadPosts() {

  console.log('cachedPosts', cachedPosts)
  console.log('postsJsonPath', postsJsonPath)
  if (cachedPosts) {
    return cachedPosts
  }

  const file = await fs.readFile(postsJsonPath, 'utf-8')
  cachedPosts = JSON.parse(file) as PostEntry[]

  console.log('Loaded posts from posts.json', { count: cachedPosts.length })
  return cachedPosts
}

async function loadPostedPosts() {
  try {
    const file = await fs.readFile(postedPostsPath, 'utf-8')
    const items = JSON.parse(file) as string[]
    return new Set(items)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return new Set<string>()
    }
    throw error
  }
}

async function savePostedPosts(postedSet: Set<string>) {
  const items = Array.from(postedSet)
  await fs.writeFile(postedPostsPath, JSON.stringify(items, null, 2), 'utf-8')
}

export async function generatePost() {
  const posts = await loadPosts()
  if (!posts.length) {
    throw new Error('No posts available in posts.json')
  }

  const postedSet = await loadPostedPosts()
  const unusedPosts = posts.filter((post) => {
    const text = `${post.title}: ${post.content}`
    return !postedSet.has(text)
  })

  if (!unusedPosts.length) {
    throw new Error('All posts in posts.json have already been published')
  }

  const selected = pickRandom(unusedPosts)
  const text = `${selected.title}: ${selected.content}`
  console.log('Generated post text', { text })
  const safe = await isTextSafe(text)
  if (!safe) {
    throw new Error('Post content failed moderation checks')
  }
  postedSet.add(text)
  await savePostedPosts(postedSet)

  return trimToLength(text, MAX_POST_LENGTH)
}

export async function generateReply(targetHandle: string) {
  throw new Error('Reply generation is disabled for this bot')
}

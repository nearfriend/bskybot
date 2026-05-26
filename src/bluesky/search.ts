import { agent } from './client'

export async function searchCandidates(keyword: string) {
  const res = await agent.app.bsky.feed.searchPosts({
    q: keyword,
    limit: 100,
  });

  const users = res.data.posts.map(post => post.author.did);

  return [...new Set(users)];
}
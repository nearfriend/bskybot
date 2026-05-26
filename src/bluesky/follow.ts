import { agent } from './client'

export async function followUser(did: string) {
  await agent.api.app.bsky.graph.follow.create(
    { repo: agent.session!.did },
    {
      subject: did,
      createdAt: new Date().toISOString(),
    }
  );

  console.log(`Followed: ${did}`);
}
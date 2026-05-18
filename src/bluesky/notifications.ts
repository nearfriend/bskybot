import { agent } from './client'

export async function listNotifications() {
  return agent.listNotifications({ limit: 30 })
}

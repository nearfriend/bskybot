const blockedTerms = ['spam', 'nsfw', 'deepfake', 'hate', 'terror']

export async function isTextSafe(text: string) {
  const normalized = text.toLowerCase()
  if (!normalized.trim()) {
    return false
  }

  for (const term of blockedTerms) {
    if (normalized.includes(term)) {
      return false
    }
  }

  if (normalized.length > 280) {
    return false
  }

  return true
}

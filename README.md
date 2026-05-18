# BSkyBot

A TypeScript Bluesky bot that posts and replies using OpenAI-driven prompts.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Fill in `BLUESKY_IDENTIFIER`, `BLUESKY_PASSWORD`, and `OPENAI_API_KEY`.

## Run

- Development: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`

## Reply behavior

- The bot selects a random external timeline post and replies to it.
- It only replies to posts not created by your own account.
- Replies are posted with proper `root` and `parent` references.
- The bot can optionally attach an image to a reply when `IMAGE_URLS` is configured.

## Notes

- This bot uses a scheduler to post on a regular cadence and monitor mentions.
- The generated content is produced by OpenAI and is subject to OpenAI and Bluesky terms of service.
- Do not use this bot in a way that violates Bluesky policy or attempts to evade detection.

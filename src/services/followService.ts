import { followUser } from '../bluesky/follow'
import { logger } from '../core/logger'
import { searchCandidates } from '../bluesky/search'
import { pickRandom } from '../utils/random'
import { env } from '../config/env'


export async function followRandomUser() {
    const candidates = await searchCandidates(pickRandom(env.SEARCH_KEYWORDS.split(',')));

    if (candidates.length > 0) {
        const user = pickRandom(candidates);

        await followUser(user);
        logger.info(`Followed user: ${user}`);
    }
}

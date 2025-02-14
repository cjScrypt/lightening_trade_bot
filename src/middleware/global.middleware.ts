import { ExtendedContext } from "../types";


export class GlobalMiddleware {
    static async initializeRedisSession(
        ctx: ExtendedContext,
        next: () => Promise<void>
    ) {
        const redisSession = {
            pendingBuyPrompt: []
        }
        ctx.redisSession = redisSession;
        await next();
    }
}
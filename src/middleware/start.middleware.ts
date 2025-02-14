import { RedisService } from "../services";
import { ExtendedContext } from "../types";


export class StartMiddleware {
    static async addpendingBuyPromptToContext(ctx: ExtendedContext, next: () => Promise<void>) {
        const chatId = ctx.chat?.id || -1; // @note ctx.chat.id will always be valid
        const pendingBuyPrompt = await (new RedisService).getPendingBuyPrompt(chatId);
        ctx.redisSession.pendingBuyPrompt = pendingBuyPrompt;
    }
}
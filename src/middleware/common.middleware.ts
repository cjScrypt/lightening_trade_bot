import { RedisService } from "../services";
import { ExtendedContext } from "../types";
import { TelegramUtils } from "../utils";

export class CommonMiddleware {
    static saveCurrentAction(action: string) {
        return async (ctx: ExtendedContext, next: () => Promise<void>) => {
            const chatId = TelegramUtils.getChatId(ctx);
            await (new RedisService()).setCurrentACtion(action, chatId);

            await next();
        };
    }
}
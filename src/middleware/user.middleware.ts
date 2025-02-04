import { UserService } from "../services";
import { ExtendedContext } from "../types";
import { TelegramUtils } from "../utils";


const userService = new UserService();

export class UserMiddleware {

    static async addUserToContext(ctx: ExtendedContext, next: () => Promise<void>) {
        const isPrivateChat = TelegramUtils.isPrivateChat(ctx.chat);
        if (!isPrivateChat) { // @todo Response with error message
            return;
        }
        if (ctx.text === "/start") { // skip if command is /start
            return await next();
        }

        const user = TelegramUtils.getUserFromContext(ctx);

        ctx.user = await userService.findUserByTgId(user.id);
        await next();
    }
}
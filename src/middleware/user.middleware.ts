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

        const tgUser = TelegramUtils.getUserFromContext(ctx);
        const user = await userService.findUserByTgId(tgUser.id);
        if (user) {
            ctx.user = user;
        }
        // @todo Do something if user is not found, maybe force user to use /start again

        await next();
    }
}
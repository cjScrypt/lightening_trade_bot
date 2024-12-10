import { UserService } from "../services";
import { ExtendedContext } from "../types";
import { TelegramUtils } from "../utils";


const userService = new UserService();


export class UserMiddleware {

    static async addUserToContext(ctx: ExtendedContext, next: () => Promise<void>) {
        const isPrivateChat = TelegramUtils.isPrivateChat(ctx.chat);
        if (!isPrivateChat) {
            return;
        }
        const user = TelegramUtils.getUserFromContext(ctx);
        if (!user) {
            return;
        }
        ctx.user = user;
        await next();
    }
}
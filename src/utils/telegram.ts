import { ExtendedContext } from "../types";
import { Chat, User } from "telegraf/typings/core/types/typegram";

export class TelegramUtils {
    static getUserFromContext(ctx: ExtendedContext): User {
        const user = ctx.callbackQuery?.from || ctx.from;
        if (!user) {
            throw new Error(
                "Current Context is missing the message originator property."
            );
        }

        return user;
    }

    static isPrivateChat(chat: Chat | undefined): boolean {
        return chat?.type == "private";
    }
}
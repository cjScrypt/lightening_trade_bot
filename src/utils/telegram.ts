import { ExtendedContext } from "../types";
import { Chat, User } from "telegraf/typings/core/types/typegram";

export class TelegramUtils {
    static getUserFromContext(ctx: ExtendedContext): User | undefined {
        return ctx.callbackQuery?.from || ctx.from;
    }

    static isPrivateChat(chat: Chat | undefined): boolean {
        return chat?.type == "private";
    }
}
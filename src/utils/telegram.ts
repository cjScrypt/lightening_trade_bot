import { ExtendedContext } from "../types";
import { User } from "telegraf/typings/core/types/typegram";

export class TelegramUtils {
    static getUserFromContext(ctx: ExtendedContext): User | undefined {
        return ctx.callbackQuery?.from || ctx.from;
    }

}
import { session, Telegraf } from "telegraf";

import APP_SETTINGS from "./config";
import { startMenu } from "./menus";
import { BotErrorHandler, UserMiddleware } from "./middleware";
import { ExtendedContext } from "./types";
import { mainStage } from "./scenes";


export const setupBot = () => {
    const bot = new Telegraf<ExtendedContext>(APP_SETTINGS.TG_TOKEN);

    bot.use(session());
    bot.use(mainStage.middleware()); // @note This doesn't work for now

    bot.use(UserMiddleware.addUserToContext);

    startMenu(bot);

    bot.catch(BotErrorHandler);

    return bot;
}

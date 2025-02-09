import { Agent } from "https";
import { session, Telegraf } from "telegraf";

import APP_SETTINGS from "./config";
import { startMenu, walletMenu } from "./menus";
import { BotErrorHandler, UserMiddleware } from "./middleware";
import { ExtendedContext } from "./types";
import { mainStage } from "./scenes";


export const setupBot = () => {
    const agent = new Agent({
        keepAlive: true,
        timeout: 20000, // Timeout in milliseconds
    });
    const bot = new Telegraf<ExtendedContext>(APP_SETTINGS.TG_TOKEN, {
        telegram: { agent }
    });

    bot.use(session());
    bot.use(mainStage.middleware()); // @note This doesn't work for now

    bot.use(UserMiddleware.addUserToContext);

    startMenu(bot);
    walletMenu(bot);

    bot.catch(BotErrorHandler);

    return bot;
}

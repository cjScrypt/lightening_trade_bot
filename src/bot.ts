import { Telegraf, Telegram } from "telegraf";

import APP_SETTINGS from "./config";
import { StartController } from "./controllers";
import { UserMiddleware } from "./middleware";
import { ExtendedContext } from "./types";
import { mainStage } from "./scenes";


export const setupBot = () => {
    const bot = new Telegraf<ExtendedContext>(APP_SETTINGS.TG_TOKEN);

    bot.use(mainStage.middleware());

    bot.use(UserMiddleware.addUserToContext);

    bot.start(StartController.showStartMenu);

    return bot;
}

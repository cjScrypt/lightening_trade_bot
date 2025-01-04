import { session, Telegraf } from "telegraf";

import APP_SETTINGS from "./config";
import { START } from "./constants";
import { CommonController } from "./controllers";
import { UserMiddleware } from "./middleware";
import { ExtendedContext } from "./types";
import { mainStage } from "./scenes";


export const setupBot = () => {
    const bot = new Telegraf<ExtendedContext>(APP_SETTINGS.TG_TOKEN);

    bot.use(session());
    bot.use(mainStage.middleware());

    bot.use(UserMiddleware.addUserToContext);

    bot.start(CommonController.enterScene(START.SCENE));

    return bot;
}

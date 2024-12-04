import { Telegraf } from "telegraf";

import APP_SETTINGS from "../config";
import { StartController } from "../controllers";

const setupBot = async () => {
    const bot = new Telegraf(APP_SETTINGS.TG_TOKEN);

    bot.start(StartController.processStart);

    return bot;
}

export default setupBot;
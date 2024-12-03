import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import APP_SETTINGS from "../utils/app_settings";

const setupBot = async () => {
    const bot = new Telegraf(APP_SETTINGS.TG_TOKEN);

    bot.start;

    return bot;
}

export default setupBot;
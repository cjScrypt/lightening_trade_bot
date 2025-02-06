import { Telegraf } from "telegraf";

import { StartController, WalletController } from "../controllers";
import { ExtendedContext } from "../types";
import { UserMiddleware } from "../middleware";
import { START } from "../constants";


export const startMenu = (bot: Telegraf<ExtendedContext>) => {
    bot.start(StartController.showStartMenu);

    bot.action(START.ACTION.WALLET, WalletController.showWalletScene);
}
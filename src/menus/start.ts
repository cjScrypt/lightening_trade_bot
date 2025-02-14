import { Telegraf } from "telegraf";

import { StartController, WalletController } from "../controllers";
import { ExtendedContext } from "../types";
import { StartMiddleware } from "../middleware";
import { START } from "../constants";


export const startMenu = (bot: Telegraf<ExtendedContext>) => {
    bot.start(StartController.showStartMenu);

    bot.action(START.ACTION.WALLET, WalletController.showWalletScene);

    bot.action(
        START.ACTION.BUY,
        StartMiddleware.addpendingBuyPromptToContext,
        StartController.showBuyInputPrompt
    );
}
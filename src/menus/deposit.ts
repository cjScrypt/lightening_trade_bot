import { Telegraf } from "telegraf";

import { DEPOSIT } from "../constants";
import { WalletController } from "../controllers";
import { ExtendedContext } from "../types";


export const depositMenu = (bot: Telegraf<ExtendedContext>) => {
    bot.action(DEPOSIT.ACTION.CLOSE, WalletController.showWalletScene);
}
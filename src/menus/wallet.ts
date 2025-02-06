import { Telegraf } from "telegraf";

import { WALLET } from "../constants";
import { ExtendedContext } from "../types";
import { StartController, WalletController } from "../controllers";


export const walletMenu = (bot: Telegraf<ExtendedContext>) => {
    bot.action(WALLET.ACTION.DEPOSIT, WalletController.showDepositScene);

    bot.action(WALLET.ACTION.TRANSFER, WalletController.showTransferScene);

    bot.action(WALLET.ACTION.REFRESH, WalletController.showWalletScene);

    bot.action(WALLET.ACTION.BACK, StartController.backToStartMenu);
}
import { Telegraf } from "telegraf";

import { WALLET } from "../constants";
import { ExtendedContext } from "../types";
import { StartController, WalletController } from "../controllers";


export const walletMenu = (bot: Telegraf<ExtendedContext>) => {
    bot.action(WALLET.ACTION.REVEAL_KEY, WalletController.showMnemonic);

    bot.action(WALLET.ACTION.DEPOSIT, WalletController.showDepositScene);

    bot.action(WALLET.ACTION.TRANSFER, WalletController.showTransferScene);

    // @todo Improve this,  currently throws error for sending same message content
    bot.action(WALLET.ACTION.REFRESH, WalletController.showWalletScene);

    bot.action(WALLET.ACTION.BACK, StartController.backToStartMenu);
}
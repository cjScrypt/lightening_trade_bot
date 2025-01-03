import { ExtendedContext } from "../types";
import { WalletView }from "../views";

export class WalletController {
    static async showWalletScene(ctx: ExtendedContext, next: () => Promise<void>) {
        await ctx.editMessageText(await WalletView.getWalletHtml(), {
            parse_mode: "HTML",
            reply_markup: WalletView.getWalletKeyboard().reply_markup
        });

        await next();
    }

    static showDepositScene(ctx: ExtendedContext, next: () => Promise<void>) {

    }

    static showTransferScene(ctx: ExtendedContext, next: () => Promise<void>) {

    }
}
import { UserService, WalletService } from "../services";
import { ExtendedContext } from "../types";
import { TelegramUtils } from "../utils";
import { WalletView }from "../views";


const walletService = new WalletService();

export class WalletController {
    static async showWalletScene(ctx: ExtendedContext, next: () => Promise<void>) {
        const user = ctx.user;
        const wallet = await walletService.getUserWallet(user.id);
        await ctx.editMessageText(await WalletView.getWalletHtml(wallet), {
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
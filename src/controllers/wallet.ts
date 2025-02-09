import { UserService, WalletService } from "../services";
import { ExtendedContext } from "../types";
import { UrlUtil } from "../utils";
import { WalletView }from "../views";
import { DepositView } from "../views/deposit";


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

    static async showDepositScene(ctx: ExtendedContext, next: () => Promise<void>) {
        const user = ctx.user;
        const wallet = await walletService.getUserWallet(user.id);
        const { deeplink, image } = await UrlUtil.generateDepositDeeplink(wallet.address);

        ctx.sendPhoto(
            {
                source: image,
            }, {
                caption: await DepositView.getDepositHtml(wallet.address),
                parse_mode: "HTML",
                reply_markup: DepositView.getDepositKeyboard(
                    wallet.address, deeplink
                ).reply_markup
            }
        );
    }

    static showTransferScene(ctx: ExtendedContext, next: () => Promise<void>) {

    }
}
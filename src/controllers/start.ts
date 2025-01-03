import { UserService, WalletService } from "../services";
import { ExtendedContext } from "../types";
import { TelegramUtils } from "../utils";
import { StartView } from "../views";


const walletService = new WalletService();
const userService = new UserService();


export class StartController {
    static async processStart(ctx: ExtendedContext, next: () => Promise<void>) {
        let tgUser = ctx.user;

        const { user, created } = await userService.getOrRegisterUser({ 
            telegramId: tgUser.id,
            username: tgUser.username,
            firstName: tgUser.first_name,
            lastName: tgUser.last_name
        });
        const name = user.firstName + ` ${user.lastName ? user.lastName : ""}`;
        let address: string, mnemonic: string, htmlContent: string, balance;
        if (created) {
            ({ address, mnemonic, balance } = await walletService.createWallet({ ownerId: user.id }));
            htmlContent = await StartView.getOnboardingStartHtml(name, { address, mnemonic, balance });
        } else {
            const { address, mnemonic, balance } = await walletService.getUserWallet(user.id);
            htmlContent = await StartView.getReturningStartHtml(name, { address, mnemonic, balance });
        }

        ctx.reply(htmlContent, {
            parse_mode: "HTML",
            reply_markup: StartView.getStartKeyboard().reply_markup,
            link_preview_options: {
                is_disabled: true
            },
            reply_parameters: {
                message_id: ctx.message?.message_id || 0
            }
        });
        await next();
    }
}

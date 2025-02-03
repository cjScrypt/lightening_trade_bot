import { UserService, WalletService } from "../services";
import { ExtendedContext, WalletData } from "../types";
import { TelegramUtils } from "../utils";
import { StartView } from "../views";


const walletService = new WalletService();
const userService = new UserService();


export class StartController {
    static async showStartMenu(ctx: ExtendedContext, next: () => Promise<void>) {
        let tgUser = TelegramUtils.getUserFromContext(ctx);

        const { user, created } = await userService.getOrRegisterUser({ 
            telegramId: tgUser.id,
            username: tgUser.username,
            firstName: tgUser.first_name,
            lastName: tgUser.last_name
        });
        const name = user.firstName + ` ${user.lastName ? user.lastName : ""}`;
        let htmlContent: string;
        if (created) {
            const wallet = await walletService.createWallet({ ownerId: user.id });
            htmlContent = await StartView.getOnboardingStartHtml(name, wallet);
        } else {
            const wallet = await walletService.getUserWallet(user.id);
            htmlContent = await StartView.getReturningStartHtml(name, wallet);
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

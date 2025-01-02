import { TonApiService, UserService, WalletService } from "../services";
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
        if (created) {
            const { address, mnemonic, lastRecordedBalance } = await walletService.createWallet({ ownerId: user.id });
            await ctx.replyWithHTML(
                await StartView.getOnboardingStartHtml(name, { address, mnemonic, lastRecordedBalance })
            );
        } else {
            const { address, mnemonic } = await walletService.getUserWallet(user.id);
            const lastRecordedBalance = await TonApiService.getAccountBalance(address);
            await ctx.replyWithHTML(
                await StartView.getReturningStartHtml(name, { address, mnemonic, lastRecordedBalance })
            );
        }

        await next();
    }
}

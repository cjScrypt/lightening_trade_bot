import { UserService, WalletService } from "../services";
import { ExtendedContext } from "../types";
import { TelegramUtils } from "../utils";


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
            const wallet = await walletService.createWallet({ ownerId: user.id });
            ctx.reply(`Welcome to Lightening Trade Bot ${name}\n
                Your mnemonic is ${wallet.mnemonic}, please keep this safe and secure.\n
                Your wallet address is ${wallet.address}`
            );
        } else {
            ctx.reply(`Welcome back ${name}`);
        }

        await next();
    }
}

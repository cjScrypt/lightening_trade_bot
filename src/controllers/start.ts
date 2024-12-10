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
        if (created) {
            const wallet = await walletService.createWallet({ ownerId: user.id });
            ctx.reply(`Welcome to Lightening Trade Bot ${user.firstName} ${user.lastName}
                Your private key is ${wallet.privateKey}, please keep this safe and secure
                Your wallet address is ${wallet.address}`
            );
        } else {
            ctx.reply(`Welcome back ${user.firstName} ${user.lastName}`);
        }

        await next();
    }
}

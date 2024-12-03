import { Context } from "telegraf";
import { UserService, WalletService } from "../services";


export class StartController {
    static async processStart(ctx: Context) {
        const walletService = new WalletService()
        const userService = new UserService();
    }
}

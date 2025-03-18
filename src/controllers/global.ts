import { TradeHandler } from "./trade.handler";
import { WalletService } from "../services";
import { ExtendedContext } from "../types";
import { TelegramUtils } from "../utils";

export class GlobalController {
    static handleTextMessage(ctx: ExtendedContext, next: () => Promise<void>) {
        let text = TelegramUtils.getMessageText(ctx);

        if ((new WalletService()).isWalletAddress(text)) {
            TradeHandler.showTokenInfo(ctx);
            return next();
        }
    }
}
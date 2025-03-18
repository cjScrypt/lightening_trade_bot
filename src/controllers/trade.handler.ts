import { TokenService } from "../services";
import { ExtendedContext } from "../types";
import { TokenInfoView } from "../views";
import { TelegramUtils } from "../utils";

export class TradeHandler {
    static async showTokenInfo(ctx: ExtendedContext) {
        const address = TelegramUtils.getMessageText(ctx);

        const metadata = await (new TokenService()).getJettonMetadata(address);
        if (!metadata) {
            ctx.sendMessage("❌ Invalid token address"); // @todo Cache message id for cleanup
            return;
        }

        const htmlContent = await TokenInfoView.getTokenInfoHtml(metadata, address);
        ctx.sendMessage(htmlContent);
    }
}
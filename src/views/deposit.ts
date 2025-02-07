import { renderFile } from "ejs";
import { resolve } from "path";
import { Markup } from "telegraf";


export class DepositView {
    static getDepositHtml(address: string) {
        return renderFile(resolve(__dirname, "deposit.ejs"), { address });
    }

    static getDepositKeyboard(address: string, deeplink: string) {
        return Markup.inlineKeyboard(
            [
                Markup.button.callback( )
            ]
        )
    }
}
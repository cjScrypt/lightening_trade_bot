import { renderFile } from "ejs";
import { resolve } from "path";
import { Markup } from "telegraf";

import { DEPOSIT } from "../constants";


export class DepositView {
    static getDepositHtml(address: string) {
        return renderFile(resolve(__dirname, "deposit.ejs"), { address });
    }

    static getDepositKeyboard(address: string, deeplink: string) {
        return Markup.inlineKeyboard(
            [
                Markup.button.url(
                    DEPOSIT.BUTTON_TEXT.OPEN_WALLET,
                    deeplink
                ),
                Markup.button.callback(
                    DEPOSIT.BUTTON_TEXT.CLOSE,
                    DEPOSIT.ACTION.CLOSE
                )
            ]
        )
    }
}
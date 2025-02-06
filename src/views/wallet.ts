import { renderFile } from "ejs";
import { resolve } from "path";
import { Markup } from "telegraf";

import { WALLET } from "../constants";
import { WalletData } from "../types";

export class WalletView {
    static getWalletHtml(wallet: WalletData) {
        return renderFile(resolve(__dirname, "wallet.ejs"), { wallet });
    }

    private static getFirstRowKeyboard() {
        return [
            Markup.button.callback(
                WALLET.BUTTON_TEXT.REVEAL_KEY,
                WALLET.ACTION.REVEAL_KEY
            )
        ]
    }

    private static getSecondRowKeyboard() {
        return [
            Markup.button.callback(
                WALLET.BUTTON_TEXT.DEPOSIT, WALLET.ACTION.DEPOSIT
            ),
            Markup.button.callback(
                WALLET.BUTTON_TEXT.TRANSFER, WALLET.ACTION.TRANSFER
            )
        ]
    }

    private static getThirdRowKeyboard() {
        return [
            Markup.button.callback(
                WALLET.BUTTON_TEXT.REFRESH, WALLET.ACTION.REFRESH
            ),
            Markup.button.callback(
                WALLET.BUTTON_TEXT.BACK, WALLET.ACTION.BACK
            )
        ]
    }

    static getWalletKeyboard() {
        const firstRow = this.getFirstRowKeyboard();
        const secondRow = this.getSecondRowKeyboard();
        const thirdRow = this.getThirdRowKeyboard();

        return Markup.inlineKeyboard([ firstRow, secondRow, thirdRow ]);
    }
}
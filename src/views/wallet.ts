import { renderFile } from "ejs";
import { resolve } from "path";
import { Markup } from "telegraf";
import { WALLET } from "../constants";

export class WalletView {
    static getWalletHtml() {
        return renderFile(resolve(__dirname, "wallet.ejs"), {

        });
    }

    private static getFirstRowKeyboard() {
        return [
            Markup.button.callback(
                WALLET.BUTTON_TEXT.REVEAL_KEY,
                WALLET.BUTTON_ACTION.REVEAL_KEY
            )
        ]
    }

    private static getSecondRowKeyboard() {
        return [
            Markup.button.callback(
                WALLET.BUTTON_TEXT.DEPOSIT, WALLET.BUTTON_ACTION.DEPOSIT
            ),
            Markup.button.callback(
                WALLET.BUTTON_TEXT.TRANSFER, WALLET.BUTTON_ACTION.TRANSFER
            )
        ]
    }

    private static getThirdRowKeyboard() {
        return [
            Markup.button.callback(
                WALLET.BUTTON_TEXT.REFRESH, WALLET.BUTTON_ACTION.REFRESH
            ),
            Markup.button.callback(
                WALLET.BUTTON_TEXT.BACK, WALLET.BUTTON_ACTION.BACK
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
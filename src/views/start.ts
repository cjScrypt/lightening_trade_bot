import { renderFile } from "ejs";
import { resolve } from "path";
import { Markup } from "telegraf";

import { WalletData } from "../types/wallet";
import { TelegramUtils } from "../utils";
import { START } from "../constants";


export class StartView {
    static getOnboardingStartHtml(
        name: string,
        wallet: WalletData
    ): Promise<string> {
        const explorer_url = "https://testnet.tonscan.org/address/" + wallet.address;
        return renderFile(resolve(__dirname, "onboarding.ejs"), {
            name, wallet, explorer_url
        });
    }

    static getReturningStartHtml(
        name: string,
    ): Promise<string> {
        return renderFile(resolve(__dirname, "start.ejs"), {
            name
        });
    }

    static getStartKeyboard() {
        return Markup.inlineKeyboard(
            [
                Markup.button.callback(
                    START.BUTTON_TEXT.WALLET,
                    START.BUTTON_ACTION.WALLET
                ),
                Markup.button.callback(
                    START.BUTTON_TEXT.BALANCE,
                    START.BUTTON_ACTION.BALANCE
                )
            ],
            { columns: 3 }
        )
    }
}
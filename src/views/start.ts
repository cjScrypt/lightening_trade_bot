import { renderFile } from "ejs";
import { resolve } from "path";
import { Markup } from "telegraf";

import { WalletData } from "../types/wallet";


export class StartView {
    static getOnboardingStartHtml(
        name: string,
        wallet: WalletData
    ): Promise<string> {
        const explorer_url = "https://testnet.tonscan.org/address/" + wallet.address;
        return renderFile(resolve(__dirname, "start.ejs"), {
            onboarding: true, name, wallet, explorer_url
        });
    }

    static getReturningStartHtml(
        name: string,
        wallet: WalletData
    ): Promise<string> {
        const explorer_url = "https://testnet.tonscan.org/address/" + wallet.address;
        return renderFile(resolve(__dirname, "start.ejs"), {
            onboarding: false, name, wallet, explorer_url
        });
    }
}
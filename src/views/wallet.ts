import { renderFile } from "ejs";
import { resolve } from "path";

export class WalletView {
    static getWalletHtml() {
        return renderFile(resolve(__dirname, "wallet.ejs"), {

        });
    }
}
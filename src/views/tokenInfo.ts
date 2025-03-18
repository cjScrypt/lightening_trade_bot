import { renderFile } from "ejs";
import { resolve } from "path";
import { JettonMetadata } from "../interfaces";

export class TokenInfoView {
    static getTokenInfoHtml(metadata: JettonMetadata, address: string) {
        const explorer = `https://tonviewer.com/${address}`;
        return renderFile(resolve(__dirname, "tokenInfo.ejs"), { metadata, explorer });
    }
}
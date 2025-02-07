import { urlToQRCodeBuffer } from ".";

export class UrlUtil {
    static async generateDepositDeeplink(recipientAddress: string
    ) {
        const message = "Deposit to personal Lightening Trade Bot wallet";
        let deeplink = `ton://transfer/${recipientAddress}?`;
        deeplink += `text=${encodeURIComponent(message)}`;

        const image = await urlToQRCodeBuffer(deeplink);

        return { deeplink, image };
    }
}
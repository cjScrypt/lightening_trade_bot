import { DEX, pTON } from "@ston-fi/sdk";
import { RouterV2_1 } from "@ston-fi/sdk/dist/contracts/dex/v2_1/router/RouterV2_1";
import { PtonV2_1 } from "@ston-fi/sdk/dist/contracts/pTON/v2_1/PtonV2_1";
import { OpenedContract, toNano } from "@ton/ton";

import { TonApiService } from "./";
import APP_SETTINGS from "../config";


export class StonFiService {
    connection: TonApiService;
    router: OpenedContract<RouterV2_1>;
    proxyTon: PtonV2_1;

    constructor() {
        this.connection = new TonApiService();
        this.router = this.connection.openContract(DEX.v2_1.Router.create(APP_SETTINGS.ROUTER_ADDRESS));
        this.proxyTon = pTON.v2_1.create(APP_SETTINGS.PROXY_TON_ADDRESS)
    }

    async buyJetton(data: {
        privateKey: string,
        publicKey: string,
        amount: bigint,
        recipientAddress: string,
        jettonContractAddress: string
    }) {
        const txParams = await this.router.getSwapTonToJettonTxParams({
            userWalletAddress: data.recipientAddress,
            proxyTon: this.proxyTon,
            offerAmount: toNano(data.amount),
            askJettonAddress: data.jettonContractAddress,
            minAskAmount: "1",
            queryId: 0
        });
        await this.connection.sendTransaction(
            txParams,
            { privateKey: data.privateKey, publicKey: data.publicKey }
        );
    }
}
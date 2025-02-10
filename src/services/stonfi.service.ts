import { DEX, pTON } from "@ston-fi/sdk";
import { RouterV1 } from "@ston-fi/sdk/dist/contracts/dex/v1/RouterV1";
import { PtonV1 } from "@ston-fi/sdk/dist/contracts/pTON/v1/PtonV1";
import { OpenedContract, toNano, TonClient } from "@ton/ton";

import { TonApiService } from "./";
import APP_SETTINGS from "../config";


export class StonFiService {
    router: OpenedContract<RouterV1>;
    proxyTon: PtonV1;

    constructor(client: TonClient) {
        this.router = client.open(new DEX.v1.Router(APP_SETTINGS.ROUTER_ADDRESS));
        this.proxyTon = new pTON.v1();
    }

    async buyJetton(data: {
        privateKey: string,
        publicKey: string,
        amount: bigint,
    }) {
        const tonService = new TonApiService();
        const txParams = await this.router.getSwapTonToJettonTxParams({
            userWalletAddress: "",
            proxyTon,
            offerAmount: toNano(data.amount),
            askJettonAddress: jettonContractAddress,
            minAskAmount: "",
            queryId: 0
        });
        await  tonService.sendTransaction(
            txParams,
            { privateKey: data.privateKey, publicKey: data.publicKey }
        );
    }
}
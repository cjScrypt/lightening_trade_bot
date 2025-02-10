import { OpenedContract, TonClient } from "@ton/ton";

import { DEX, pTON } from "@ston-fi/sdk";
import { RouterV1 } from "@ston-fi/sdk/dist/contracts/dex/v1/RouterV1";


export class StonFiService {
    dex: OpenedContract<RouterV1>;

    constructor(client: TonClient) {
        this.dex = client.open(new DEX.v1.Router());
    }
}
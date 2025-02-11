import { internal, Address, Contract, SenderArguments, TonClient, WalletContractV3R2 } from "@ton/ton";

import APP_SETTINGS from "../config";


export class TonApiService {
    client: TonClient;

    constructor() {
        this.client = new TonClient({
            apiKey: APP_SETTINGS.TON_API_KEY,
            endpoint: APP_SETTINGS.TON_API_ENDPOINT,
            timeout: 15000
        });
    }

    async getAccountBalance(address: string): Promise<bigint> {
        const balance = await this.client.getBalance(Address.parse(address));

        return balance;
    }

    openContract<X extends Contract>(contract: X) {
        return this.client.open(contract);
    }

    async sendTransaction(
        txParams: SenderArguments,
        walletArgs: { publicKey: string, privateKey: string }
    ) {
        const wallet = WalletContractV3R2.create({
            workchain: 0, publicKey: Buffer.from(walletArgs.publicKey)
        });
        const walletContract = this.client.open(wallet);

        walletContract.sendTransfer({
            seqno: await walletContract.getSeqno(),
            secretKey: Buffer.from(walletArgs.privateKey),
            messages: [internal(txParams)]
        });
    }
}
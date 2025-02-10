import { Address, TonClient, TonClient4 } from "@ton/ton";
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
}
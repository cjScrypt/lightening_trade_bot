import { Address, TonClient, TonClient4 } from "@ton/ton";
import APP_SETTINGS from "../config";

const client = new TonClient({
    apiKey: APP_SETTINGS.TON_API_KEY,
    endpoint: APP_SETTINGS.TON_API_ENDPOINT
});


export class TonApiService {
    static async getAccountBalance(address: string): Promise<bigint> {
        const balance = await client.getBalance(Address.parse(address));

        return balance;
    }
}
import { createClient, RedisClientType } from "redis";

import APP_SETTINGS from "../config";


export class RedisService {
    client: RedisClientType;

    constructor() {
        this.client = createClient({ url: APP_SETTINGS.REDIS_URL });
    }

    async setPendingBuyPrompt(chatId: number, messageId: number) {
        const key = `${chatId}_buy_prompt`;
        const value = JSON.stringify([messageId]);
        await this.client.set(key, value);
    }

    async getPendingBuyPrompt(chatId: number): Promise<string[]> {
        const key = `${chatId}_buy_prompt`;
        const value = await this.client.get(key);
        if (!value) {
            return []
        }

        return JSON.parse(value);
    }

    async getCurrentAction(chatId: number) {
        const key = `CURRENT_ACTION_${chatId}`;
        return this.client.get(key);
    }

    async setCurrentACtion(action: string, chatId: number) {
        const key = `CURRENT_ACTION_${chatId}`;
        this.client.set(key, action);
    }
}
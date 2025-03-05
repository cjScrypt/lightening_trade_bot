import { RedisClientType } from "redis";

import { client } from './redis';

export class RedisService {
    client: RedisClientType;

    constructor() {
        this.client = client;
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

    async setValue(key: string, value: string, ttl?: number) {
        if (ttl) {
            await this.client.set(key, value, { EX: ttl });
        } else {
            await this.client.set(key, value);
        }
    }

    async getValue(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async delete(key: string) {
        return this.client.del(key);
    }
}

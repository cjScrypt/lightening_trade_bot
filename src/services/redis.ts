import { RedisClientType, createClient } from 'redis';

import APP_SETTINGS from "../config";

export const client: RedisClientType = createClient({
    url: APP_SETTINGS.REDIS_URL
});

client.connect();

import { Context, Scenes } from "telegraf";
import { User } from "@prisma/client";

import { RedisSession } from "./redisSession";


export interface ExtendedContext extends Context {
    redisSession: RedisSession;
    user: User;
    scene: Scenes.SceneContextScene<ExtendedContext>;
}
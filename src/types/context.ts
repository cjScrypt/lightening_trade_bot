import { Context, Scenes } from "telegraf";

import { User } from "@prisma/client";


export interface ExtendedContext extends Context {
    user: User;
    scene: Scenes.SceneContextScene<ExtendedContext>;
}
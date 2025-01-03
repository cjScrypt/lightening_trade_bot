import { Context, Scenes } from "telegraf";
import { User } from "telegraf/typings/core/types/typegram";


export interface ExtendedContext extends Context {
    user: User;
    scene: Scenes.SceneContextScene<ExtendedContext>;
}
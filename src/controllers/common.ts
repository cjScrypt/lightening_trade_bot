import { START } from "../constants";
import { ExtendedContext } from "../types";

export class CommonController {
    static enterScene(scene: string) {
        return async (ctx: ExtendedContext) => {
            await ctx.scene.enter(scene);
        };  
    }

    static async deleteMessage(ctx: ExtendedContext, next: () => Promise<void>) {
        await ctx.deleteMessage();
        await next();
    }
}
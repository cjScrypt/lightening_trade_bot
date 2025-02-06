import { ExtendedContext } from "../types";

export const BotErrorHandler = async (
    error: unknown, ctx: ExtendedContext
) => {
    console.log("======================Error=======================\n", error);
    
}
import { Scenes } from "telegraf";

import { ExtendedContext } from "../types";
import { walletScene } from "./wallet";


export const mainStage = new Scenes.Stage<ExtendedContext>(
    [ walletScene ]
)
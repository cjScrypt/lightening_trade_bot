import { Scenes } from "telegraf";

import { ExtendedContext } from "../types";
import { startScene } from "./start";
import { walletScene } from "./wallet";


export const mainStage = new Scenes.Stage<ExtendedContext>(
    [ startScene, walletScene ]
);
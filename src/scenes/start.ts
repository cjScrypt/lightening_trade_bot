import { Scenes } from "telegraf";

import { START, WALLET } from "../constants";
import { UserMiddleware } from "../middleware";
import { ExtendedContext } from "../types";
import { CommonController, StartController } from "../controllers";

export const startScene = new Scenes.BaseScene<ExtendedContext>(START.COMMAND);

startScene.use(UserMiddleware.addUserToContext);

startScene.enter(StartController.showStartMenu);

startScene.action(
    START.ACTION.WALLET, CommonController.enterScene(WALLET.SCENE)
);

startScene.leave();
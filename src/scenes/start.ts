import { Scenes } from "telegraf";

import { START, WALLET } from "../constants";
import { UserMiddleware } from "../middleware";
import { ExtendedContext } from "../types";
import { CommonController, StartController } from "../controllers";

export const startScene = new Scenes.BaseScene<ExtendedContext>(START.SCENE);

startScene.use(UserMiddleware.addUserToContext);

startScene.enter(StartController.showStartMenu);

startScene.action(
    START.BUTTON_ACTION.WALLET, CommonController.enterScene(WALLET.SCENE)
);

startScene.leave();
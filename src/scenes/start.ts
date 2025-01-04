import { Scenes } from "telegraf";

import { START } from "../constants";
import { ExtendedContext } from "../types";
import { StartController } from "../controllers";

export const startScene = new Scenes.BaseScene<ExtendedContext>(START.SCENE);

startScene.enter(StartController.showStartMenu);
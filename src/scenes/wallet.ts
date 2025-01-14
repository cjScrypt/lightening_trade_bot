import { Scenes } from "telegraf";

import { START, WALLET } from "../constants";
import { StartController, WalletController } from "../controllers";
import { UserMiddleware } from "../middleware";
import { ExtendedContext } from "../types";

export const walletScene = new Scenes.BaseScene<ExtendedContext>(WALLET.SCENE);

walletScene.use(UserMiddleware.addUserToContext);

walletScene.enter(WalletController.showWalletScene);

walletScene.action(
    WALLET.BUTTON_ACTION.DEPOSIT, WalletController.showDepositScene
);

walletScene.action(
    WALLET.BUTTON_ACTION.TRANSFER, WalletController.showTransferScene
);

walletScene.action(WALLET.BUTTON_ACTION.BACK, StartController.showStartMenu);

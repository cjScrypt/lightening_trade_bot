import { Express } from "express";

import { setupBot } from "./bot";
import APP_SETTINGS from "./config";


const configureApp = async (app: Express) => {
	const bot = setupBot();

	app.use(await bot.createWebhook({ domain: APP_SETTINGS.WEBHOOK_DOMAIN }));
}


export default configureApp;

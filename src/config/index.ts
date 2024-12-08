import dotenv from "dotenv";

dotenv.config();

export default {
    TG_TOKEN: process.env.TG_TOKEN || "",
	WEBHOOK_DOMAIN: process.env.WEBHOOK_DOMAIN || ""
}

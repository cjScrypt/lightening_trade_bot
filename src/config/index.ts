import dotenv from "dotenv";

dotenv.config();

export default {
    TG_TOKEN: process.env.TG_TOKEN || "",
	WEBHOOK_DOMAIN: process.env.WEBHOOK_DOMAIN || "",
    TON_API_KEY: process.env.TON_API_KEY || "",
    TON_API_ENDPOINT: process.env.TON_API_ENDPOINT || "",
    PROXY_TON_ADDRESS: process.env.PROXY_TON_ADDRESS || "",
    ROUTER_ADDRESS: process.env.ROUTER_ADDRESS || ""
}

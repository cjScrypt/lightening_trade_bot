import cron from 'node-cron';
import APP_SETTINGS from '../config';
import { RedisService } from '../services';

export const runTONPriceUpdateSchedule = () => {
    const EVERY_1_MIN = '*/1 * * * *';
    try {
        cron.schedule(EVERY_1_MIN, () => {
            updateTonPrice();
        }).start();
    } catch (error) {
        console.error(
            `Error running the schedule job for fetching the TON price: ${error}`
        );
    }
}

const updateTonPrice = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${APP_SETTINGS.TON_CONSOLE_KEY}`,
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch("https://tonapi.io/v2/rates?tokens=TON&currencies=usd", options);
    const data = await response.json();
    const price = data.rates.TON.prices.USD;
    const key = 'TON_PRICE';

    await (new RedisService()).setValue(key, price);
}
import { KnownAssetRepository } from "../database/repository";
import { RedisService } from "./redis.service";
import { StonFiService } from "./stonfi.service";
import { JettonMetadata } from "../interfaces";

export class TokenService {
    knownAssetRepository: KnownAssetRepository;
    redisService: RedisService;
    stonFiService: StonFiService;

    constructor () {
        this.stonFiService = new StonFiService();
        this.redisService = new RedisService();
        this.knownAssetRepository = new KnownAssetRepository();
    }

    async getJettonMetadata(contractAddress: string) {
        const key = `${contractAddress}_metadata`;
        const data = await this.redisService.getValue(key) as JettonMetadata;
        if (data) {
            return data;
        }

        const url = `https://api.dexscreener.com/tokens/v1/ton/${contractAddress}`;
        const response = await fetch(url);
        const responseData = await response.json();
        if (responseData.length == 0) {
            return null;
        }

        const metadata: JettonMetadata = {
            name: responseData[0].baseToken.name,
            symbol: responseData[0].baseToken.symbol,
            price: responseData[0].priceUsd,
            marketCap: responseData[0].marketCap,
        }
        await this.redisService.setValue(key, metadata);

        return metadata;
    }
}
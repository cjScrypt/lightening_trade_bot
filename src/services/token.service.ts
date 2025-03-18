import { KnownAssetRepository } from "../database/repository";
import { RedisService } from "./redis.service";
import { StonFiService } from "./stonfi.service";

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
        let knownAsset = await this.knownAssetRepository.findOne({ contractAddress });
        if (knownAsset) {
            const key = `${knownAsset.contractAddress}_price`;
            const price = await this.redisService.getValue(key);
            return {
                ...knownAsset,
                price
            }
        }

        const asset = await this.stonFiService.getAssetByAddress(contractAddress);
        if (!asset) {
            return null;
        }

        knownAsset = await this.knownAssetRepository.create({
            contractAddress: asset.contractAddress,
            symbol: asset.symbol,
            displayName: asset.displayName,
            imageUrl: asset.imageUrl
        });
        
        return {
            ...knownAsset,
            price: asset.dexPriceUsd
        }
    }
}
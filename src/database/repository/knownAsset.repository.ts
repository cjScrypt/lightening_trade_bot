import prisma from "../prisma/client";

export class KnownAssetRepository {
    constructor() {}

    async findOne(filter: {}) {
        const asset = await prisma.knownAsset.findFirst({
            where: filter
        });

        return asset;
    }
}
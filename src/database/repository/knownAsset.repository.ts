import prisma from "../prisma/client";

export class KnownAssetRepository {
    constructor() {}

    async create(data: {
        contractAddress: string,
        symbol: string,
        displayName?: string,
        imageUrl?: string
    }) {
        return prisma.knownAsset.create({ data });
    }

    async findOne(filter: {}) {
        const asset = await prisma.knownAsset.findFirst({
            where: filter
        });

        return asset;
    }
}
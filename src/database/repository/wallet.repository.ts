import { handlePrismaError } from "../../utils";
import prisma from "../prisma/client";


export default class WalletRepository {
    constructor() {}

    async create(data: {
        privateKey: string,
        publicKey: string,
        address: string,
        ownerId: number
    }) {
        try {
            const wallet = await prisma.wallet.create({
                data: {
                    privateKey: data.privateKey,
                    publicKey: data.publicKey,
                    address: data.address,
                    ownerId: data.ownerId,
                    lastRecordedBalance: 0
                }
            });
            return wallet;
        } catch (error) {
            handlePrismaError(error);
        }
    }

}
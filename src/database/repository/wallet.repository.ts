import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import prisma from "../prisma/client";


export default class WalletRepository {
    constructor() {}

    async create(data: {
        privateKey: string,
        publicKey: string,
        mnemonic: string, 
        address: string,
        ownerId: number
    }) {
        try {
            const wallet = await prisma.wallet.create({
                data: {
                    privateKey: data.privateKey,
                    publicKey: data.publicKey,
                    mnemonic: data.mnemonic,
                    address: data.address,
                    ownerId: data.ownerId,
                    lastRecordedBalance: 0
                }
            });
            return wallet;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new Error(`User already owns wallet`);
                }
            }
            throw error;
        }
    }

}
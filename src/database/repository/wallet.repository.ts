import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import prisma from "../prisma/client";
import { CreateWalletInput } from "../../types";


export default class WalletRepository {
    constructor() {}

    async create(data: CreateWalletInput) {
        try {
            const wallet = await prisma.wallet.create({ data });
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

    async findOne(filter: any) {
        const wallet = await prisma.wallet.findFirst({
            where: filter
        });

        return wallet;
    }

}
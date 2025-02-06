import { Wallet } from "@prisma/client"


export type WalletData = Wallet;

export type CreateWalletInput = {
    privateKey: string,
    publicKey: string,
    mnemonic: string, 
    address: string,
    version: string,
    ownerId: number
}
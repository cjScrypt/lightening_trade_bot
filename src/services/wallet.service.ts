import { mnemonicToWalletKey, mnemonicNew } from "@ton/crypto";
import { WalletContractV3R2 } from "@ton/ton";

import WalletRepository from "../database/repository/wallet.repository";


export class WalletService {
    repository: WalletRepository;

    constructor() {
        this.repository = new WalletRepository();
    }

    async createWallet(fields: { ownerId: number }) {
        const mnemonicArray = await mnemonicNew(24);
        const keyPair = await mnemonicToWalletKey(mnemonicArray);
        const walletContract = WalletContractV3R2.create({ workchain: 0, publicKey: keyPair.publicKey });

        const wallet = await this.repository.create({
            privateKey: keyPair.secretKey.toString(),
            publicKey: keyPair.publicKey.toString(),
            address: walletContract.address.toString(),
            ownerId: fields.ownerId
        });

        return { address: wallet.address, privateKey: wallet.privateKey }
    }
}
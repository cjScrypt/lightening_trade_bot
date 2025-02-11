import { mnemonicToWalletKey, mnemonicNew } from "@ton/crypto";
import { WalletContractV3R2 } from "@ton/ton";

import { TonApiService } from "./";
import WalletRepository from "../database/repository/wallet.repository";
import { WALLET } from "../constants";


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
            mnemonic: mnemonicArray.join(" "),
            address: walletContract.address.toString(),
            version: WALLET.VERSION.V3R2,
            ownerId: fields.ownerId
        });

        return wallet;
    }

    async getUserWallet(userId: number) {
        const wallet = await this.repository.findOne({ ownerId: userId });
        if (!wallet) {
            throw new Error();
        }

        return wallet;
    }

    async getWalletBalance(address: string) {
        // @todo Improve: Implement hybrid approach,
        // Cache balance and fetch new data in real time
        return await (new TonApiService()).getAccountBalance(address);
    }
}
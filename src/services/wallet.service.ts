import { mnemonicToWalletKey, mnemonicNew } from "@ton/crypto";
import { Address, WalletContractV3R2 } from "@ton/ton";

import { RedisService, TonApiService } from "./";
import WalletRepository from "../database/repository/wallet.repository";
import { WALLET } from "../constants";


export class WalletService {
    repository: WalletRepository;
    redisService: RedisService;
    tonApiService: TonApiService;

    constructor() {
        this.repository = new WalletRepository();
        this.redisService = new RedisService();
        this.tonApiService = new TonApiService();
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
        const tonBalance = await this.getTonBalance(wallet.address);

        return { ...wallet, balance: tonBalance };
    }

    async getTonBalance(address: string) {
        let tonBalance = 0;
        const key = `${address}_tonbalance`;
        const data = await this.redisService.getValue(key);
        if (data) {
            return Number(data);
        }

        const balance = await this.tonApiService.getAccountBalance(address);
        if (balance) {
            const tonBalance = balance / BigInt(10 ** 9);
            await this.redisService.setValue(key, String(tonBalance), 60);
        }

        return tonBalance;
    }
}
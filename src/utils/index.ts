import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import QRCode from "qrcode";

export * from "./telegram";
export * from "./urls";


export const handlePrismaError = (error: any) => {
    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
            throw new Error(`User already owns wallet`);
        }
    }
}

export const urlToQRCodeBuffer = async (url: string) => {
    return await QRCode.toBuffer(url);
}
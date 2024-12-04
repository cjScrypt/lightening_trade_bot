import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export * from "./telegram";


export const handlePrismaError = (error: any) => {
    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
            throw new Error(`User already owns wallet`);
        }
    }
}
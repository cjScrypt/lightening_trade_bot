import prisma from "../prisma/client";


export default class UserRepository {
    constructor() {}

    async createNewUser(fields: {
        telegramId: number,
        username?: string,
        firstName: string,
        lastName?: string
    }) {
        const user = await prisma.user.create({
            data: {
                telegramId: fields.telegramId,
                username: fields.username,
                firstName: fields.firstName,
                lastName: fields.lastName
            }
        });
        return user;
    }

    async findUser(filter: any) {
        const user = await prisma.user.findFirst({
            where: filter
        });

        return user;
    }
}
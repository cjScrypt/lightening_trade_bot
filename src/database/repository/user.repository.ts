import prisma from "../prisma/client";


export default class UserRepository {
    constructor() {}

    async createNewUser(fields: {
        telegramId: string,
        username: string,
        displayName?: string
    }) {
        const user = await prisma.user.create({
            data: {
                telegramId: fields.telegramId, username: fields.username,
                displayName: fields.displayName
            }
        });
        return user;
    }
}
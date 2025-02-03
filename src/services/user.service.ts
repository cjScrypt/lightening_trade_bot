import UserRepository from "../database/repository/user.repository";


export class UserService {
    repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async getOrRegisterUser(fields: { telegramId: number, username?: string, firstName: string, lastName?: string}) {
        let user = await this.repository.findUser({ telegramId: fields.telegramId });
        let created = false;
        if (!user) {
            user = await this.repository.createNewUser(fields);
            created = true;
        }

        return { user, created }
    }

    async findUserByTgId(userId: number) {
        const user = await this.repository.findUser({ telegramId: userId });
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}
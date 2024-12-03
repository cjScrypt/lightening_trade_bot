
import UserRepository from "../database/repository/user.repository";

class UserService {
    repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async registerUser(fields: { telegramId: string, username: string, displayName?: string }) {
        const user = await this.repository.createNewUser(fields);

        return user;
    }
}
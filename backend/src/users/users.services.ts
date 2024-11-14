import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { Users } from "./users.entity";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ){}

    addUser(user: Users) {
        return this.usersRepository.addUser(user);
    }
}
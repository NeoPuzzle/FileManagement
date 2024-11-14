import { Injectable } from "@nestjs/common";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ){}

    async addUser(user: Users):Promise<Users> {
        const newUser = await this.userRepository.save(user);
        return newUser;
    }
}
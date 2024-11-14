import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { UsersService } from "./users.services";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    providers:[UsersService, UsersRepository],
    controllers: [UsersController],
})

export class UsersModule{};
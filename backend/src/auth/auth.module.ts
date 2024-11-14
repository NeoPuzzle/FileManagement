import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersRepository } from "src/users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/users.entity";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    providers: [AuthService, UsersRepository],
    controllers: [AuthController]
})

export class AuthModule {}
import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.services";
import { Users } from "./users.entity";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService:UsersService
    ){}

    @Post()
    addUser(@Body() user: Users){
        return this.usersService.addUser(user);
    }

}
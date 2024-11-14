import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Users } from "src/users/users.entity";
import { LoginUserDto } from "./login.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('signup')
    addUser(@Body() user: Users){
        return this.authService.signUp(user);
    }

    @Post('signin')
    async signIn(@Body() user: LoginUserDto){
        return this.authService.signIn(user.name, user.password);
    }

}
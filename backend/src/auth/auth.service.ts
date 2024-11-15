import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Users } from "src/users/users.entity";
import { UsersRepository } from "src/users/users.repository";
import * as bcrypt from 'bcrypt';
import { Role } from "src/enum/roles.enum";

@Injectable()
export class AuthService {

    constructor(private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
) {}

    async signUp(user: Users) {
        const newUser = await this.usersRepository.getUserByName(user.name);
        if(newUser) throw new BadRequestException('User already exists');

        const hashedPassword = await bcrypt.hash(user.password, 10);
        if(!hashedPassword) throw new BadRequestException('Error hashing password');
        return await this.usersRepository.addUser({...user, password: hashedPassword});
    }

    async signIn(name: string, password: string) {
        const user = await this.usersRepository.getUserByName(name);
        if(!user) throw new BadRequestException('Invalid credentials');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) throw new BadRequestException('Invalid credentials');

        let userRoles: Role[]
        
        userRoles = [user.isAdmin ? Role.ADMIN : Role.USER]
        
        const userPayload = {
            sub: user.name,
            id: user.id,
            roles: userRoles
        }

        const token = this.jwtService.sign(userPayload);

        console.log("Token: ", token);
        
        return { success: 'User logged in successfully', token}
    }

}
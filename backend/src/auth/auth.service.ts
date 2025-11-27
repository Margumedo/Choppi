import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        // Check if user exists and has a password (not OAuth user)
        if (user && user.password && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = {
            email: user.email,
            sub: user.id,
            name: user.name, // Include name in JWT
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                name: user.name,
                email: user.email,
            },
        };
    }

    async register(user: any) {
        const newUser = await this.usersService.create(user);
        return this.login(newUser);
    }
}

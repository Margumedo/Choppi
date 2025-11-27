import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findOneByGoogleId(googleId: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { googleId } });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(userData: Partial<User>): Promise<User> {
        if (!userData.password) {
            throw new Error('Password is required');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }

    async findOrCreateGoogleUser(googleData: {
        googleId: string;
        email: string;
        name: string;
    }): Promise<User> {
        // 1. Try to find by Google ID
        let user = await this.findOneByGoogleId(googleData.googleId);

        if (user) {
            return user; // User already exists with this Google account
        }

        // 2. Try to find by email (link existing account)
        user = await this.findOneByEmail(googleData.email);

        if (user) {
            // Link Google ID to existing account
            user.googleId = googleData.googleId;
            return this.userRepository.save(user);
        }

        // 3. Create new user
        const newUser = this.userRepository.create({
            email: googleData.email,
            name: googleData.name,
            googleId: googleData.googleId,
            // password is optional for Google users
        });

        return this.userRepository.save(newUser);
    }
}

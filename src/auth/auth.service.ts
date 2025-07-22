import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService
    ) { }

    async register(dto: CreateUserDto) {
        const existing = await this.userRepo.findOne({ where: { email: dto.email } });
        if (existing) {
            throw new BadRequestException('Email already registered !!');
        }

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ ...dto, password: hashed });
        return this.userRepo.save(user);
    }
      

    async validateUser(email: string, password: string) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, name: user.name, email: user.email },
        };
    }

    async findProfile(userId: number) {
        return this.userRepo.findOne({ where: { id: userId } });
    }

    async updateProfile(id: number, updateDto: UpdateUserDto) {
        const userWithSameEmail = await this.userRepo.findOne({
            where: { email: updateDto.email },
        });

        if (userWithSameEmail && userWithSameEmail.id !== id) {
            throw new BadRequestException('Email sudah digunakan');
        }

        await this.userRepo.update(id, updateDto);
        return this.userRepo.findOneBy({ id });
    }
      
      
}

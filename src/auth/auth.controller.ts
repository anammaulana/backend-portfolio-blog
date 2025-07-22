import { Controller, Post, Body, UseGuards, Get, Request, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { APIResponse } from 'src/api-response/api-response';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // @Post('register')
    // register(@Body() dto: CreateUserDto) {
    //     return this.authService.register(dto);
    // }

    // @Post('login')
    // login(@Body() dto: LoginDto) {
    //     return this.authService.login(dto.email, dto.password);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //     return this.authService.findProfile(req.user.userId);
    // }


    // @UseGuards(JwtAuthGuard)
    // @Put('profile')
    // async updateProfile(
    //     @Request() req,
    //     @Body() dto: UpdateUserDto,
    // ) {
    //     // console.log('[DEBUG] req.user:', req.user);
    //     const userId = req.user.userId;
    //     return this.authService.updateProfile(userId, dto);
    // }

    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        const data = await this.authService.register(dto);
        return APIResponse.success(data, 'Registrasi berhasil');
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const data = await this.authService.login(dto.email, dto.password);
        return APIResponse.success(data, 'Login berhasil');
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const data = await this.authService.findProfile(req.user.userId);
        return APIResponse.success(data, 'Profil berhasil diambil');
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    async updateProfile(@Request() req, @Body() dto: UpdateUserDto) {
        const userId = req.user.userId;
        const data = await this.authService.updateProfile(userId, dto);
        return APIResponse.success(data, 'Profil berhasil diperbarui');
    }


}

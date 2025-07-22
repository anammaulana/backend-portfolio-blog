import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PortfolioService } from './portfolio.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/portfolio')
export class PortfolioController {
    constructor(private readonly service: PortfolioService) { }

    @Post()
    create(@Body() dto: CreateProjectDto, @Request() req) {
        return this.service.create(dto, req.user);
    }

    @Get()
    findAll() {
        return this.service.findAll( );
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateProjectDto) {
        return this.service.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(+id);
    }
}
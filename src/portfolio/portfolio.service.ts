import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from 'src/auth/entities/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectRepository(Project)
        private readonly portfolioRepository: Repository<Project>,
    ) { }

    async create(createDto: CreateProjectDto, user: User) {
        const portfolio = this.portfolioRepository.create({ ...createDto, user });
        return this.portfolioRepository.save(portfolio);
    }

    findAll() {
        return this.portfolioRepository.find({ order: { createdAt: 'DESC' } });
    }

    async findOne(id: number) {
        const portfolio = await this.portfolioRepository.findOne({ where: { id } });
        if (!portfolio) throw new NotFoundException('Portfolio not found');
        return portfolio;
    }

    async update(id: number, updateDto: UpdateProjectDto) {
        await this.portfolioRepository.update(id, updateDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const portfolio = await this.findOne(id);
        return this.portfolioRepository.remove(portfolio);
      }
}

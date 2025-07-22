import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPostEntity } from './entities/blog-post.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';
import { BlogResponseDto } from './dto/blog-response.dto';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogPostEntity)
        private blogRepository: Repository<BlogPostEntity>,
    ) { }

    // findAll() {
    //     return this.blogRepository.find({ order: { createdAt: 'DESC' } });
    // }

    async findAll() {
        const blogs = await this.blogRepository.find({
            relations: ['author'],
            order: { createdAt: 'DESC' },
        });

        return blogs.map(blog => {
            return {
                ...blog,
                author: plainToInstance(User, blog.author), // Exclude password here
            };
        });
      }

    async findOne(id: number) {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) throw new NotFoundException('Blog not found');
        return blog;
    }


    async create(dto: CreateBlogDto, userId: number) {
        const blog = this.blogRepository.create({ ...dto, author: { id: userId } });
        return this.blogRepository.save(blog);
    }

    async update(id: number, dto: UpdateBlogDto, userId: number) {
        const blog = await this.blogRepository.findOne({ where: { id }, relations: ['author'] });

        if (!blog || blog.author.id !== userId) {
            throw new ForbiddenException('Not allowed to update this blog');
        }

        Object.assign(blog, dto);
        return this.blogRepository.save(blog);
    }

    async remove(id: number, userId: number) {
        const blog = await this.blogRepository.findOne({ where: { id }, relations: ['author'] });

        if (!blog || blog.author.id !== userId) {
            throw new ForbiddenException('Not allowed to delete this blog');
        }

        return this.blogRepository.remove(blog);
    }
      
}

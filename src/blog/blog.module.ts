import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPostEntity } from './entities/blog-post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BlogPostEntity])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}

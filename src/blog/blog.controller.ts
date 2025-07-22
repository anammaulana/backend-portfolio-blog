import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { APIResponse } from 'src/api-response/api-response';
import { BlogResponseDto } from './dto/blog-response.dto';

@Controller('api/blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }
    
    @Get()
    findAll() {
        return this.blogService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<APIResponse<BlogResponseDto> | APIResponse<null>> {
        try {
            const blog = await this.blogService.findOne(id);
            return APIResponse.success(blog, 'Blog detail fetched');
        } catch (error) {
            return APIResponse.error('Failed to fetch blog', error?.message || error);
        }
    }
    

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() createBlogDto: CreateBlogDto) {
        return this.blogService.create(createBlogDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Request() req, @Body() updateBlogDto: UpdateBlogDto) {
        return this.blogService.update(+id, updateBlogDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.blogService.remove(+id, req.user.userId);
    }

}

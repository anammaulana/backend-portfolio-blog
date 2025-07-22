import { Type } from 'class-transformer';
import { UserResponseDto } from 'src/auth/dto/user-response.dto';

export class BlogResponseDto {
    id: number;
    title: string;
    content: string;
    coverImage: string;
    createdAt: Date;
    updatedAt: Date;

    @Type(() => UserResponseDto)
    author: UserResponseDto;
}

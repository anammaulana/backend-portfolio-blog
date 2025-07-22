
import { Exclude } from 'class-transformer';
import { BlogPostEntity } from 'src/blog/entities/blog-post.entity';
import { Project } from 'src/portfolio/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    name: string;

    @OneToMany(() => BlogPostEntity, (blog) => blog.author)
    blogs: BlogPostEntity[];

    @OneToMany(() => Project, portfolio => portfolio.user)
    portfolios: Project[];

}

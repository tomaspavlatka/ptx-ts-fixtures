import { Module } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { GetPostByIdQuery } from './use-cases/queries/get-post-by-id.query';
import { CommonModule } from '@common/common.module';
import { CreatePostCommand } from './use-cases/commands/create-post.command';
import { PostMapper } from './mappers/post.mapper';

@Module({
  imports: [CommonModule],
  providers: [
    PostRepository, 
    GetPostByIdQuery, 
    CreatePostCommand, 
    PostMapper
  ],
  exports: [GetPostByIdQuery, CreatePostCommand]
})
export class PostsModule { }

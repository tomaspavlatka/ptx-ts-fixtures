import { Module } from '@nestjs/common';
import { PostController } from './posts/posts.controller';
import { GetPostByIdQuery } from './posts/use-cases/queries/get-post-by-id.query';
import { CommonModule } from '@common/common.module';
import { PostsModule } from '@posts/posts.module';
import { CreatePostCommand } from './posts/use-cases/commands/create-post.command';

@Module({
  imports: [CommonModule, PostsModule],
  providers: [GetPostByIdQuery, CreatePostCommand],
  controllers: [PostController],
})
export class ApplicationModule { }

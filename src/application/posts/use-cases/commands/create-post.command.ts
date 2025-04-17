import { CreatePostRequest } from "@app/posts/contracts/create-post.request";
import { PostResponse } from "@app/posts/contracts/post.response";
import { Either } from "@common/either";
import { ContextAwareException } from "@common/exceptions/context-aware.exception";
import { Injectable } from "@nestjs/common";
import { CreatePostCommand as PostsCreatePostCommand } from "@posts/use-cases/commands/create-post.command";

@Injectable()
export class CreatePostCommand {
  constructor(private readonly createCommand: PostsCreatePostCommand) { }

  async execute(request: CreatePostRequest): Promise<Either<ContextAwareException, PostResponse>> {
    return this.createCommand.execute(request);
  }
}

import { CreatePostRequest } from "@app/posts/contracts/create-post.request";
import { PostResponse } from "@app/posts/contracts/post.response";
import { Either } from "@common/either";
import { ContextAwareException } from "@common/exceptions/context-aware.exception";
import { Injectable } from "@nestjs/common";
import { PostMapper } from "@posts/mappers/post.mapper";
import { PostRepository } from "@posts/repositories/post.repository";

@Injectable()
export class CreatePostCommand {
  constructor(
    private readonly mapper: PostMapper,
    private readonly repository: PostRepository
  ) { }

  async execute(request: CreatePostRequest): Promise<Either<ContextAwareException, PostResponse>> {
    return (
      await this.mapper.toCreateInput(request)
        .bindAsync((draft) => this.repository.create(draft))
    ).mapRight((post) => PostResponse.fromPost(post));
  }
}

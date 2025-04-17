import { Injectable } from "@nestjs/common";
import { PostResponse } from "@app/posts/contracts/post.response";
import { ContextAwareException } from "@common/exceptions/context-aware.exception";
import { Either } from "@common/either";
import { GetPostByIdQuery as PostsGetPostByIdQuery } from "@posts/use-cases/queries/get-post-by-id.query";

@Injectable()
export class GetPostByIdQuery {
  constructor(private readonly getById: PostsGetPostByIdQuery) { }

  async execute(postId: string): Promise<Either<ContextAwareException, PostResponse>> {
    return this.getById.execute(postId);
  }
}

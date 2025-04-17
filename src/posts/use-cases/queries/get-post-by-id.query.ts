import { PostResponse } from "@app/posts/contracts/post.response";
import { Either } from "@common/either";
import { ContextAwareException } from "@common/exceptions/context-aware.exception";
import { Injectable } from "@nestjs/common";
import { PostRepository } from "@posts/repositories/post.repository";

@Injectable()
export class GetPostByIdQuery {
  constructor(private readonly repository: PostRepository) { }
  async execute(postId: string): Promise<Either<ContextAwareException, PostResponse>> {
    return (await this.repository.getById(postId)).mapRight((post) => PostResponse.fromPost(post));
  }
}

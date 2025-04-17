import { PostNotFoundException } from "../exceptions/post-not-found.exception";
import { PrismaService } from "@common/services/prisma.service";
import { ContextAwareException } from "@common/exceptions/context-aware.exception";
import { Either } from "@common/either";
import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "@common/repositories/abstract.repository";
import { Post, Prisma } from "@prisma/client";

@Injectable()
export class PostRepository extends AbstractRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async getById(postId: string): Promise<Either<ContextAwareException, Post>> {
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId
      }
    });

    return post === null
      ? Either.left(PostNotFoundException.create(`id:${postId}`))
      : Either.right(post);
  }

  async create(
    draft: Prisma.PostCreateInput
  ): Promise<Either<ContextAwareException, Post>> {
    try {
      const post = await this.prisma.$transaction(
        async (tx): Promise<Post> => {
          return await tx.post.create({
            data: draft,
          });
        },
      );

      return Either.right(post);
    } catch (ex) {
      return Either.left(this.decorateException(ex));
    }
  }
}

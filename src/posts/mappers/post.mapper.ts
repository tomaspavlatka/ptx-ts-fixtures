import { CreatePostRequest } from "@app/posts/contracts/create-post.request";
import { Either } from "@common/either";
import { ContextAwareException } from "@common/exceptions/context-aware.exception";
import { DateService } from "@common/services/date.service";
import { IdService } from "@common/services/id.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma";

@Injectable()
export class PostMapper {
  constructor(
    private readonly id: IdService,
    private readonly date: DateService,
  ) { }

  toCreateInput(request: CreatePostRequest): Either<ContextAwareException, Prisma.PostCreateInput> {
    return Either.right({
      id: this.id.generate('p'),
      title: request.title,
      content: request.content,
      createdAt: this.date.now(),
      updatedAt: this.date.now()
    });
  }
}

import { Body, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { GetPostByIdQuery } from "./use-cases/queries/get-post-by-id.query";
import { EitherInterceptor } from "@common/interceptors/either.interceptor";
import { CreatePostRequest } from "./contracts/create-post.request";
import { CreatePostCommand } from "./use-cases/commands/create-post.command";

@Controller("posts")
@UseInterceptors(EitherInterceptor)
export class PostController {
  constructor(
    private readonly getById: GetPostByIdQuery,
    private readonly createCommand: CreatePostCommand
  ) {}

  @Get(":postId")
  profile(@Param("postId") postId: string) {
    return this.getById.execute(postId);
  }

  @Post()
  create(@Body() request: CreatePostRequest) {
    return this.createCommand.execute(request);
  }
}

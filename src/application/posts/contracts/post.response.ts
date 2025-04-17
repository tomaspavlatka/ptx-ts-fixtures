import { plainToInstance } from "class-transformer";
import { Post } from "generated/prisma";

export class PostResponse {
  readonly id: string;
  readonly title: string;
  readonly content: string
  readonly createdAt: Date
  readonly updatedAt: Date

  static create(data: Required<PostResponse>) {
    return plainToInstance(PostResponse, data);
  }

  static fromPost(post: Post) {
    return PostResponse.create({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    });
  }
}

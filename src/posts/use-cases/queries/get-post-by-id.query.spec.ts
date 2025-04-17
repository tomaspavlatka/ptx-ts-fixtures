import { PostResponse } from "@app/posts/contracts/post.response";
import { Either } from "@common/either";
import { IdService } from "@common/services/id.service";
import { Test, TestingModule } from "@nestjs/testing";
import { PostFixture } from "@posts/dtos/post.fixture";
import { PostNotFoundException } from "@posts/exceptions/post-not-found.exception";
import { PostRepository } from "@posts/repositories/post.repository";
import { GetPostByIdQuery } from "@posts/use-cases/queries/get-post-by-id.query";
import { Post } from "@prisma/client";

describe('posts.get-post-by-id.query', () => {
  let repository = {
    getById: jest.fn(),
    create: jest.fn(),
  };

  let query: GetPostByIdQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPostByIdQuery,
        {
          provide: PostRepository,
          useValue: repository,
        },
      ],
    }).compile();

    query = module.get<GetPostByIdQuery>(GetPostByIdQuery);
  });

  it('propagates either.left if this retrieved from the repository', async () => {
    const postId = IdService.getId('p');
    const repositoryResponse = Either.left(PostNotFoundException.create(`id:${postId}`));
    repository.getById.mockResolvedValue(repositoryResponse);

    const response = await query.execute(postId);

    expect(response).toStrictEqual(repositoryResponse);
  });

  it('reponds with post.response when post found ', async () => {
    const date = new Date();
    const post: Post = {
      id: 'id',
      title: 'title',
      content: 'content',
      createdAt: date,
      updatedAt: date
    }
    const repositoryResponse = Either.right(post);
    repository.getById.mockResolvedValue(repositoryResponse);

    const postId = 'dummy';
    const response = await query.execute(postId);

    const expectedResponse = PostResponse.create({
      id: 'id',
      title: 'title',
      content: 'content',
      createdAt: date,
      updatedAt: date
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.getRight()).toStrictEqual(expectedResponse);
  });

  it('reponds with post.response when post found, consice and better ', async () => {
    const post: Post = PostFixture.create();
    repository.getById.mockResolvedValue(Either.right(post));
    const response = await query.execute(post.id);

    const expectedResponse = PostResponse.create({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.getRight()).toStrictEqual(expectedResponse);
  });
});

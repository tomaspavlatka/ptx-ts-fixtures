import { Test, TestingModule } from "@nestjs/testing";
import { CreatePostRequestFixture } from "@app/posts/contracts/create-post.request.fixture";
import { NotImplementedException } from "@common/exceptions/not-implemented.exception";
import { Either } from "@common/either";
import { faker } from "@faker-js/faker/.";
import { CreatePostCommand } from "./create-post.command";
import { PostMapper } from "@posts/mappers/post.mapper";
import { PostRepository } from "@posts/repositories/post.repository";
import { PostFixture } from "@posts/dtos/post.fixture";
import { CreatePostRequest } from "@app/posts/contracts/create-post.request";
import { IdServiceDummy } from "@tests/services/id.service.dummy";
import { DateServiceDummy } from "@tests/services/date.service.dummy";
import { PostResponse } from "@app/posts/contracts/post.response";

describe('posts.create-post.command', () => {
  let repository = {
    getById: jest.fn(),
    create: jest.fn()
  }

  let command: CreatePostCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePostCommand,
        {
          provide: PostRepository,
          useValue: repository
        },
        {
          provide: PostMapper,
          useFactory: () => {
            const id = new IdServiceDummy();
            const date = new DateServiceDummy();
            return new PostMapper(id, date);
          }
        }
      ],
    }).compile();

    command = module.get<CreatePostCommand>(CreatePostCommand);
  });

  // STEP 2
  it('propagates either.left when this retrieved from the post.command, old', async () => {
    const request: CreatePostRequest = {
      title: faker.lorem.words(),
      content: faker.lorem.sentences()
    }

    const repositoryResponse = Either.left(NotImplementedException.create());
    repository.create.mockResolvedValue(repositoryResponse);

    const response = await command.execute(request)

    expect(response).toStrictEqual(repositoryResponse);
  });

  // STEP 2
  it('responds with post.response when post created in database', async () => {
    const request: CreatePostRequest = {
      title: faker.lorem.words(),
      content: faker.lorem.sentences()
    }

    const post = PostFixture.create();
    const repositoryResponse = Either.right(post);
    repository.create.mockResolvedValue(repositoryResponse);

    const response = await command.execute(request)

    const expectedResponse = PostResponse.fromPost(post);
    expect(response.isRight()).toBeTruthy();
    expect(response.getRight()).toStrictEqual(expectedResponse);
  });

  it('propagates either.left when this retrieved from the respository', async () => {
    const request = CreatePostRequestFixture.create();
    const repositoryResponse = Either.left(NotImplementedException.create());
    repository.create.mockResolvedValue(repositoryResponse);

    const response = await command.execute(request)

    expect(response).toStrictEqual(repositoryResponse);
  });

  it('responds with post.response when data crated in repository', async () => {
    const request = CreatePostRequestFixture.create();
    const post = PostFixture.create();
    const repositoryResponse = Either.right(post);
    repository.create.mockResolvedValue(repositoryResponse);

    const response = await command.execute(request)

    const expectedResponse = PostResponse.fromPost(post);
    expect(response.isRight()).toBeTruthy();
    expect(response.getRight()).toStrictEqual(expectedResponse);
  });
});

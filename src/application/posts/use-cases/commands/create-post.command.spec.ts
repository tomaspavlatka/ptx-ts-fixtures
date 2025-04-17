import { Test, TestingModule } from "@nestjs/testing";
import { CreatePostCommand } from "./create-post.command";
import { CreatePostCommand as PostsCreatePostCommand } from "@posts/use-cases/commands/create-post.command";
import { CreatePostRequestFixture } from "@app/posts/contracts/create-post.request.fixture";
import { NotImplementedException } from "@common/exceptions/not-implemented.exception";
import { Either } from "@common/either";
import { PostResponseFixture } from "@app/posts/contracts/post.response.fixture";
import { CreatePostRequest } from "@app/posts/contracts/create-post.request";
import { faker } from "@faker-js/faker/.";

describe('appplication.create-post.command', () => {
  let postCommand = {
    execute: jest.fn()
  }

  let command: CreatePostCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePostCommand,
        {
          provide: PostsCreatePostCommand,
          useValue: postCommand,
        },
      ],
    }).compile();

    command = module.get<CreatePostCommand>(CreatePostCommand);
  });


  it('propagates either.left when this retrieved from the post.command', async () => {
    const request = CreatePostRequestFixture.create();
    const postResponse = Either.left(NotImplementedException.create());
    postCommand.execute.mockResolvedValue(postResponse);

    const response = await command.execute(request)

    expect(response).toStrictEqual(postResponse);
  });

  it('propagates either.right when this retrieved from the post.command', async () => {
    const request = CreatePostRequestFixture.create();
    const postResponse = Either.right(PostResponseFixture.create());
    postCommand.execute.mockResolvedValue(postResponse);

    const response = await command.execute(request)

    expect(response).toStrictEqual(postResponse);
  });

  it('propagates either.left when this retrieved from the post.command, old', async () => {
    const request: CreatePostRequest = {
      title: faker.lorem.words(),
      content: faker.lorem.sentences()
    }

    const postResponse = Either.left(NotImplementedException.create());
    postCommand.execute.mockResolvedValue(postResponse);

    const response = await command.execute(request)

    expect(response).toStrictEqual(postResponse);
  });
});

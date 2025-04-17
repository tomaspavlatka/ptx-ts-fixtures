import { Test, TestingModule } from "@nestjs/testing";
import { PostMapper } from "./post.mapper";
import { IdServiceDummy } from "@tests/services/id.service.dummy";
import { DateServiceDummy } from "@tests/services/date.service.dummy";
import { CreatePostRequestFixture } from "@app/posts/contracts/create-post.request.fixture";
import { Prisma } from "@prisma/client";

describe('posts.post.mapper', () => {
  let id: IdServiceDummy;
  let date: DateServiceDummy;
  let mapper: PostMapper;

  beforeEach(async () => {
    id = new IdServiceDummy();
    date = new DateServiceDummy();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PostMapper,
          useFactory: () => {
            return new PostMapper(id, date);
          }
        }
      ],
    }).compile();

    mapper = module.get<PostMapper>(PostMapper);
  });

  it('creates CreateInput correctly', () => {
    const request = CreatePostRequestFixture.create();

    const response = mapper.toCreateInput(request);

    const expected: Prisma.PostCreateInput = {
      id: id.generate('p'),
      title: request.title,
      content: request.content,
      createdAt: date.now(),
      updatedAt: date.now()
    }

    expect(response.isRight()).toBeTruthy();
    expect(response.getRight()).toStrictEqual(expected);
  });
});

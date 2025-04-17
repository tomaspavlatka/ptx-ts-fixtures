import { PostResponse } from "./post.response";
import { IdService } from "@common/services/id.service";
import { faker } from "@faker-js/faker/.";
import { Fixture } from "@common/dtos/fixture";

export class PostResponseFixture {
  static create(overwrites: Partial<PostResponse> = {}): PostResponse {
    const defaults: Required<PostResponse> = {
      id: IdService.getId('p'),
      title: faker.lorem.words({ min: 3, max: 5 }),
      content: faker.lorem.sentences(),
      createdAt: Fixture.createdAt(),
      updatedAt: Fixture.updatedAt()
    }

    return Fixture.createFixture(PostResponse, defaults, overwrites);
  }
}

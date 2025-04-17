import { Fixture } from "@common/dtos/fixture";
import { CreatePostRequest } from "./create-post.request";
import { faker } from "@faker-js/faker/.";

export class CreatePostRequestFixture {
  static create(overwrites: Partial<CreatePostRequest> = {}): CreatePostRequest {
    const defaults: Required<CreatePostRequest> = {
      title: faker.lorem.words({ min: 3, max: 5 }),
      content: faker.lorem.sentences(),
    };

    return Fixture.createFixture(CreatePostRequest, defaults, overwrites);
  }
}

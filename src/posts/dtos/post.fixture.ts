import { IdService } from "@common/services/id.service";
import { Post } from "@prisma/client";
import { faker } from '@faker-js/faker';
import { Fixture } from "@common/dtos/fixture";

export class PostFixture {
  static create(overwrites: Partial<Post> = {}): Post {
    const defaults: Required<Post> = {
      id: IdService.getId('p'),
      title: faker.lorem.words({min: 3, max: 5}),
      content: faker.lorem.sentences(),
      createdAt: Fixture.createdAt(),
      updatedAt: Fixture.updatedAt(),
    };

    return { ...defaults, ...overwrites };
  }
}

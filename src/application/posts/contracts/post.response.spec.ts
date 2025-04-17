import { PostFixture } from "@posts/dtos/post.fixture";
import { PostResponse } from "./post.response";

describe('post.response', () => {
  it('creates itself correctly from prisma.post model', () => {
    const post = PostFixture.create();

    const expected = PostResponse.create({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });

    const response = PostResponse.fromPost(post);

    expect(response).toStrictEqual(expected);
  });
});

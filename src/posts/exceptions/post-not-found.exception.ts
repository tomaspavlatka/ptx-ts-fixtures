import { ContextAwareException } from "@common/exceptions/context-aware.exception";

export class PostNotFoundException extends ContextAwareException {
  static create(lookedBy: string) {
    const context = { lookedBy };
    return new PostNotFoundException(
      'Post has not been found',
      3004,
      404,
      context,
    );
  }
}

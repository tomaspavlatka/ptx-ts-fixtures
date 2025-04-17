import { Prisma } from 'generated/prisma';
import { ContextAwareException } from './context-aware.exception';

export class DatabaseException extends ContextAwareException {
  static create(info?: string) {
    const context = { info };
    return new DatabaseException('Database exception', 1001, 500, context);
  }

  static fromValidationError(ex: Prisma.PrismaClientValidationError) {
    const context = { msg: ex.message, context: ex.stack };
    return new DatabaseException(
      'Database validation error',
      1002,
      500,
      context,
    );
  }
}

import { ContextAwareException } from '@common/exceptions/context-aware.exception';
import { DatabaseException } from '@common/exceptions/database.exception';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

export abstract class AbstractRepository {
  protected decorateException(ex: any): DatabaseException {
    if (ex instanceof ContextAwareException) {
      return ex;
    }

    if (ex instanceof PrismaClientValidationError) {
      return DatabaseException.fromValidationError(ex);
    }

    const info = typeof ex === 'object' && 'message' in ex ? ex.message : '';

    return DatabaseException.create(info);
  }
}

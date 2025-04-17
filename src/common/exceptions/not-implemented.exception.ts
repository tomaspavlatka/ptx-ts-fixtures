import { ContextAwareException } from './context-aware.exception';

export class NotImplementedException extends ContextAwareException {
  static create(info: string = 'text') {
    const context = { info };
    return new NotImplementedException(
      'Functionality has not been implemented yet.',
      1006,
      500,
      context,
    );
  }
}

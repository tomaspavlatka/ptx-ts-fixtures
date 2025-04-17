import { ContextAwareException } from '@common/exceptions/context-aware.exception';
import { plainToInstance } from 'class-transformer';

export class ErrorResponse {
  readonly errorCode: number;

  readonly timestamp: string;

  readonly errorMsg: string;

  readonly details: object;

  static create(data: Partial<ErrorResponse> = {}) {
    const defaults = {
      errorMsg: 'Internal Server Error',
      timestamp: new Date().toISOString(),
    };

    return plainToInstance(ErrorResponse, { ...defaults, ...data });
  }

  static fromContextAwareException(error: ContextAwareException) {
    return this.create({
      details: error.context ?? {},
      errorCode: error.errorCode,
      errorMsg: error.message,
    });
  }
}

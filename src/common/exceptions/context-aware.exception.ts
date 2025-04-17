export class ContextAwareException extends Error {
  readonly context?: object;
  readonly errorCode: number;
  readonly httpStatus: number;

  constructor(
    message: string,
    errorCode: number,
    httpStatus: number,
    context?: object,
  ) {
    super(message);
    this.errorCode = errorCode;
    this.httpStatus = httpStatus;
    this.context = context;
  }
}

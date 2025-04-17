import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ErrorResponse } from '../contracts/error.response';
import { Either } from '../either';

@Injectable()
export class EitherInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse(); // Get the response object

    return next.handle().pipe(
      map((data) => {
        if (!Either.isEither(data)) {
          return data;
        }

        if (data.isLeft()) {
          response.status(data.getLeft().httpStatus);
          return ErrorResponse.fromContextAwareException(data.getLeft());
        }

        return data.getRight();
      }),
    );
  }
}

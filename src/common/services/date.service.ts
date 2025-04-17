import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  now() {
    return new Date();
  }
}

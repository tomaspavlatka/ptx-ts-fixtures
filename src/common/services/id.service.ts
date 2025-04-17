import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class IdService {
  generate(prefix: string): string {
    return IdService.getId(prefix);
  }

  static getId(prefix: string): string {
    return `${prefix}-${createId()}`;
  }
}

import { faker } from '@faker-js/faker/.';
import { plainToInstance } from 'class-transformer';

export class Fixture {
  static integer(max?: number): number {
    return faker.number.int({ max });
  }

  static address(): string {
    return `${faker.location.streetAddress()}, ${faker.location.zipCode()} ${faker.location.city()}`;
  }

  static boolean(): boolean {
    return faker.helpers.arrayElement([true, false]);
  }

  static positiveNumber(): number {
    return faker.number.float({ min: 0, max: 1000 });
  }

  static decimalNumber(): number {
    return faker.number.float();
  }

  static nullable<T>(value: T): null | T {
    return faker.helpers.arrayElement([null, value]);
  }

  static undefinable<T>(value: T): T | undefined {
    return faker.helpers.arrayElement([undefined, value]);
  }

  static pastDate(days: number = 1): Date {
    return faker.date.recent({ days });
  }

  static createdAt(): Date {
    return new Date('2024-12-07T22:21:10.491Z');
  }

  static updatedAt(): Date {
    return new Date('2024-12-07T23:21:10.491Z');
  }

  static dateOfBirthString(): string {
    return Fixture.dateOfBirth().toISOString().split('T')[0];
  }

  static dateOfBirth(): Date {
    return new Date('2024-12-07T00:00:00.000Z');
  }

  static phone(): string {
    return '+498002300600';
  }

  static createFixture<T>(
    cls: new () => T,
    defaults: Partial<T>,
    overwrites: Partial<T> = {},
  ): T {
    return plainToInstance(cls, { ...defaults, ...overwrites });
  }

  static removeUndefinedRecursively<T>(obj: T): T {
    for (const key in obj) {
      const value = obj[key];

      // If the value is an object, recursively clean it
      if (typeof value === 'object' && value !== null) {
        obj[key] = this.removeUndefinedRecursively(value);
      }

      // If the value is undefined, delete the property
      if (obj[key] === undefined) {
        delete obj[key];
      }
    }

    return obj;
  }
}

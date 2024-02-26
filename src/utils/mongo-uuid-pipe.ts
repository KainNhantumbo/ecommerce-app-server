import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

export class MongoUUIDPipe {
  constructor() {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (!isMongoId(value))
      throw new BadRequestException(`Invalid provided resource ID: ${value}`);
  }
}

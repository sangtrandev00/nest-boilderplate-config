import { NotFoundException } from '@nestjs/common';

export class MessageNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.postNotFound', error);
  }
}

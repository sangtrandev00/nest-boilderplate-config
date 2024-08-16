import type { ICommand, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageEntity } from '../message.entity';

export class GetMessageQuery implements ICommand {
  constructor(public readonly userId: Uuid) {}
}

@QueryHandler(GetMessageQuery)
export class GetMessageHandler implements IQueryHandler<GetMessageQuery> {
  constructor(
    @InjectRepository(MessageEntity)
    private postRepository: Repository<MessageEntity>,
  ) {}

  async execute(query: GetMessageQuery) {
    return this.postRepository.findBy({
      userId: query.userId as never,
    });
  }
}

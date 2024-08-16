import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateMessageDto } from '../dtos/create-message.dto';
import { MessageEntity } from '../message.entity';

export class CreateMessageCommand implements ICommand {
  constructor(
    public readonly userId: Uuid,
    public readonly createMessageDto: CreateMessageDto,
  ) {}
}

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler
  implements ICommandHandler<CreateMessageCommand, MessageEntity>
{
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async execute(command: CreateMessageCommand) {
    const { userId, createMessageDto } = command;
    const postEntity = this.messageRepository.create({ userId });

    await this.messageRepository.save(postEntity);

    return postEntity;
  }
}

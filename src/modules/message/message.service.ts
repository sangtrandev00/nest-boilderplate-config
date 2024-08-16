import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto';
import { CreateMessageCommand } from './commands/create-message.command';
import { CreateMessageDto } from './dtos/create-message.dto';
import type { MessageDto } from './dtos/message.dto';
import type { UpdateMessageDto } from './dtos/update-message.dto';
import { MessageNotFoundException } from './exceptions/message-not-found.exception';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private postRepository: Repository<MessageEntity>,
    private commandBus: CommandBus,
  ) {}

  @Transactional()
  createMessage(
    userId: Uuid,
    createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    return this.commandBus.execute<CreateMessageCommand, MessageEntity>(
      new CreateMessageCommand(userId, createMessageDto),
    );
  }

  //   async getAllMessage(
  //     postPageOptionsDto: MessagePageOptionsDto,
  //   ): Promise<PageDto<MessageDto>> {
  //     const queryBuilder = this.postRepository
  //       .createQueryBuilder('post')
  //       .leftJoinAndSelect('post.translations', 'postTranslation');
  //     const [items, pageMetaDto] =
  //       await queryBuilder.paginate(postPageOptionsDto);

  //     return items.toPageDto(pageMetaDto);
  //   }

  async getAll(): Promise<any[]> {
    return 'hello world to get All';
  }

  async getSingleMessage(id: Uuid): Promise<MessageEntity> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id });

    const postEntity = await queryBuilder.getOne();

    if (!postEntity) {
      throw new MessageNotFoundException();
    }

    return postEntity;
  }

  async updateMessage(
    id: Uuid,
    updateMessageDto: UpdateMessageDto,
  ): Promise<void> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id });

    const postEntity = await queryBuilder.getOne();

    if (!postEntity) {
      throw new MessageNotFoundException();
    }

    this.postRepository.merge(postEntity, updateMessageDto);

    await this.postRepository.save(updateMessageDto);
  }

  async deleteMessage(id: Uuid): Promise<void> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id });

    const postEntity = await queryBuilder.getOne();

    if (!postEntity) {
      throw new MessageNotFoundException();
    }

    await this.postRepository.remove(postEntity);
  }
}

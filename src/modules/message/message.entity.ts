import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { MessageDto } from './dtos/message.dto';

@Entity({ name: 'messages' })
@UseDto(MessageDto)
export class MessageEntity extends AbstractEntity<MessageDto> {
  @Column({ type: 'uuid' })
  userId!: Uuid;

  @Column({ type: 'char', length: 255 })
  description: Uuid;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateMessageHandler } from './commands/create-message.command';
import { MessageController } from './message.controller';
import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';
import { GetMessageHandler } from './queries/get-message.query';

const handlers = [CreateMessageHandler, GetMessageHandler];

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessageService, ...handlers],
  controllers: [MessageController],
})
export class MessageModule {}

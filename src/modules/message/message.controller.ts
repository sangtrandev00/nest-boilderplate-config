import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants';
import { ApiPageResponse, Auth, AuthUser, UUIDParam } from '../../decorators';
import { UseLanguageInterceptor } from '../../interceptors/language-interceptor.service';
import { UserEntity } from '../user/user.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessageDto } from './dtos/message.dto';
import { UpdateMessageDto } from './dtos/update-message.dto';
import { MessageService } from './message.service';

@Controller('posts')
@ApiTags('posts')
export class MessageController {
  constructor(private postService: MessageService) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: MessageDto })
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @AuthUser() user: UserEntity,
  ) {
    const postEntity = await this.postService.createMessage(
      user.id,
      createMessageDto,
    );

    return postEntity.toDto();
  }

  //   @Get()
  //   @Auth([RoleType.USER])
  //   @UseLanguageInterceptor()
  //   @ApiPageResponse({ type: MessageDto })
  //   async getMessages(
  //     @Query() postsPageOptionsDto: MessagePageOptionsDto,
  //   ): Promise<PageDto<MessageDto>> {
  //     return this.postService.getAllMessage(postsPageOptionsDto);
  //   }

  @Get('all')
  @Auth([RoleType.USER])
  @UseLanguageInterceptor()
  @ApiPageResponse({ type: MessageDto })
  async getAll(): Promise<any[]> {
    return this.postService.getAll();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: MessageDto })
  async getSingleMessage(@UUIDParam('id') id: Uuid): Promise<MessageDto> {
    const entity = await this.postService.getSingleMessage(id);

    return entity.toDto();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  updateMessage(
    @UUIDParam('id') id: Uuid,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<void> {
    return this.postService.updateMessage(id, updateMessageDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  async deleteMessage(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.postService.deleteMessage(id);
  }
}

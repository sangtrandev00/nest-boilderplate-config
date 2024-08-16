import { TranslationsField } from '../../../decorators';

export class CreateMessageDto {
  @TranslationsField({ type: String })
  description!: string;
}

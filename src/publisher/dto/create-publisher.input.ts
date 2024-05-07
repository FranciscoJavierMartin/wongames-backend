import { IsString } from 'class-validator';

export class CreatePublisherInput {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}

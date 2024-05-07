import { IsString } from 'class-validator';

export class CreatePlatformInput {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}

import { IsString } from 'class-validator';

export class CreateDeveloperInput {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}

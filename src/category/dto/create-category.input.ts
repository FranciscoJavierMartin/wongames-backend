import { IsString } from 'class-validator';

export class CreateCategoryInput {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Game {
  @Field({ description: 'Game name' })
  name: string;
}

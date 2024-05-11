import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GameModule } from './game/game.module';
import { CategoryModule } from './category/category.module';
import { DeveloperModule } from './developer/developer.module';
import { PublisherModule } from './publisher/publisher.module';
import { PlatformModule } from './platform/platform.module';
import { HealthModule } from './health/health.module';
import { EnvVars, validate } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      validate,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get(EnvVars.DATABASE_URL),
      }),
    }),
    GameModule,
    CategoryModule,
    DeveloperModule,
    PublisherModule,
    PlatformModule,
    HealthModule,
  ],
})
export class AppModule {}

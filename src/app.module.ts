import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { JobsController } from './jobs/jobs.controller';
import { JobsService } from './jobs/jobs.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [JobsController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    JobsService,
  ],
})
export class AppModule {}

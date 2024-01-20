import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { JobsController } from './jobs/jobs.controller';
import { JobsService } from './jobs/jobs.service';

import { UserModule } from './users/users.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [JobsController, HealthController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    JobsService,
  ],
})
export class AppModule {}

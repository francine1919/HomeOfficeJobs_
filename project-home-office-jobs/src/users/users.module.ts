import { Module } from '@nestjs/common';
import { HashManager } from 'src/commons/bcrypt';
import { Authenticator } from 'src/commons/tokenGenerator';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [Authenticator, HashManager, UsersService],
  exports: [Authenticator, HashManager],
  controllers: [UsersController],
})
export class UserModule {}

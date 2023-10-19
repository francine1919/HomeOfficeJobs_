import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { HashManager } from 'src/commons/bcrypt';
import { KnexService } from 'src/db/knex.service';
import { UserSignup, UserLogin, UserAuthentication } from './dto/users.dto';
import { Authenticator } from 'src/commons/tokenGenerator';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: KnexService,
    private readonly hashManager: HashManager,
    private readonly token: Authenticator,
  ) {}
  tableUsers = 'users';

  async signup(body: UserSignup) {
    const id = randomUUID();
    const pass = await this.hashManager.genHash(body.password);

    await this.db.knex(this.tableUsers).insert({
      id: id,
      name: body.name,
      email: body.email,
      password: pass,
    });
    const token = this.token.generateToken({ id });
    return { id: randomUUID(), token };
  }

  async login(body: UserLogin): Promise<string> {
    const user: UserAuthentication[] = await this.db
      .knex(this.tableUsers)
      .select('password', 'email', 'id')
      .where('email', body.email);

    if (!user) throw new NotFoundException('Usuário não cadastrado.');

    const compareHash = this.hashManager.compare(
      body.password as string,
      user[0].password,
    );

    if (!compareHash)
      throw new UnauthorizedException('Email ou senha incorretos.');
    const token = this.token.generateToken({ id: user[0].id as UUID });
    return token;
  }
}

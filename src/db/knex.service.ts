// src/database/knex.service.ts
import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';
import knexConfig from './knexfile';

@Injectable()
export class KnexService {
  readonly knex: Knex;

  constructor() {
    this.knex = knex(knexConfig);
  }
}

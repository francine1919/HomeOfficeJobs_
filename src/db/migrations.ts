import { DatabaseModule } from './database.module';
import { KnexService } from './knex.service';
import { Injectable } from '@nestjs/common';

const printError = (error: any) => {
  console.log(error.sqlMessage || error.message);
};
@Injectable()
export class CreateTables extends DatabaseModule {
  constructor(private readonly db: KnexService) {
    super();
  }
  createTables = () =>
    this.db.knex
      .raw(
        `
    CREATE TABLE IF NOT EXISTS user(
        id varchar(255) NOT NULL,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        password varchar(20) NOT NULL
    )
    ENGINE=InnoDB DEFAULT CHARSET=latin1;

    CREATE TABLE IF NOT EXISTS JobOffers (
        id int(11) NOT NULL AUTO_INCREMENT,
        title text NOT NULL,
        description text NOT NULL,
        date varchar(100) NOT NULL,
        jobType varchar(100) NOT NULL,
        requirements text,
        benefits text,
        user varchar(500) DEFAULT NULL,
        lastUpdated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        optionals text,
        optionalss text,
        country varchar(255) NOT NULL,
        city varchar(255) NOT NULL,
        international tinyint(1) DEFAULT NULL,
        PRIMARY KEY (id)
    )
    ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
   `,
      )
      .then(() => {
        console.log('Tables created successfully!!');
      })
      .catch(printError);

  closeConnection = () => {
    this.db.knex.destroy();
  };
}
const knex = new KnexService();
const migrations = new CreateTables(knex);

migrations.createTables().finally(migrations.closeConnection);

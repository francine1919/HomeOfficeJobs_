// knexfile.ts
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};

// import { Knex } from 'knex';

// const knexConfig: Knex.Config = {
//   client: 'mysql',
//   connection: {
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     timezone: 'utc',
//   },
//   pool: {
//     min: 2,
//     max: 10,
//   },
// };

//export default knexConfig;
// // import { Knex } from 'knex';

// // const config: Knex.Config = {
// //   client: 'mysql2',
// //   connection: {
// //     host: process.env.DB_HOST,
// //     port: parseInt(process.env.DB_PORT),
// //     user: process.env.DB_USER,
// //     password: process.env.DB_PASSWORD,
// //     database: process.env.DB_NAME,
// //   },
// // };

// // export default config;

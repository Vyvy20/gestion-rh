import config from "./config/config.json" assert { type: 'json' };
import knex from "knex";

console.log(config)

const databaseConf = config.database

const database = knex({
    client: 'mysql',
    connection: {
      host : databaseConf.host,
      port : databaseConf.port,
      user : databaseConf.username,
      password : databaseConf.password,
      database : databaseConf.database
    }
  });

export { database }

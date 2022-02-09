require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? ".env.test" : ".env"
})
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const database = process.env.DB_DATABASE

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host,
      port : 5432,
      user ,
      password ,
      database ,
    },
    migrations: {
      tableName: "knexMigrations",
      directory: `${__dirname}/src/database/migrations`
    }
  }
};

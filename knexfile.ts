let env = process.env.NODE_ENV_TYPE == undefined ? "" : process.env.NODE_ENV_TYPE
env = env.trim()
if(env === "development") {
    require("dotenv").config();
}

if(env === "test") {
    require("custom-env").env("test")
}

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const database = process.env.DB_DATABASE

module.exports = {
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
};

require('dotenv').config()

module.exports = {
  host:  process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: "postgres",
  logging: false,
  define: {
    timestamps:true,
    underscored:true,
    underscoredAll:true
  }
}
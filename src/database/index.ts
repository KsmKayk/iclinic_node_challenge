const knexfile = require("../../knexfile")
const knex = require("knex")(knexfile.development)

export default knex
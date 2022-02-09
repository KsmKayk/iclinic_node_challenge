const envType = process.env.NODE_ENV_TYPE = "test" ? "test" : ""
require('custom-env').env(envType)
import express from  'express'
import routes from "./routes"

const app = express()

app.use(express.json())
app.use(routes)

export default app
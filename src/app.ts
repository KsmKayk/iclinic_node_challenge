let env = process.env.NODE_ENV_TYPE == undefined ? "" : process.env.NODE_ENV_TYPE
env = env.trim()
if(env === "development") {
    require("dotenv").config();
}

if(env === "test") {
    require("custom-env").env("test")
}

import express from  'express'
import routes from "./routes"

const app = express()

app.use(express.json())
app.use(routes)

export default app
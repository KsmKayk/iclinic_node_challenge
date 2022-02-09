require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? ".env.test" : ".env"
})
import express from  'express'
import routes from "./routes"

const app = express()

app.use(express.json())
app.use(routes)

export default app
require('custom-env').env(process.env.NODE_ENV);
import express from  'express'
import routes from "./routes"

const app = express()

app.use(express.json())
app.use(routes)

export default app
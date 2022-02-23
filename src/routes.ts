import express from "express";
const knex = require("./database/index");
const routes = express.Router();
const PrescriptionsController = require("./controllers/PrescriptionsController")

routes.post("/v2/prescriptions", PrescriptionsController.store)


export default routes;
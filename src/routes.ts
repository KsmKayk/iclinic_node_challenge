import express from "express";
const knex = require("./database/index");
const routes = express.Router();
const PrescriptionsController = require("./controllers/PrescriptionsController")

routes.post("/prescriptions", PrescriptionsController.store)


export default routes;
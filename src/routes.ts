import express from "express";
const knex = require("./database/index");
const routes = express.Router();


routes.get("/", async (req, res) => {
    await knex("prescriptions").insert({
        clinic_id: 1,
        physician_id:1,
        patient_id:1,
        text:"test"
    })
    return res.json({})
})

export default routes;
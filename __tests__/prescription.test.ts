import knexCleaner from "knex-cleaner"
import knex from "../src/database/index"
import CreatePrescription from "../src/services/CreatePrescription"

describe("Prescription",() => {
    it("should be able to create a new prescription", async () => {
        const data = {
            clinic_id: 1,
            physician_id: 1,
            patient_id:1,
            text: "Dipirona 1x ao dia"
        }

        const response = await CreatePrescription(data)
        expect(response).toHaveProperty("id")
        expect(response).toHaveProperty("text")
    })
    afterAll(done => {
        knexCleaner.clean(knex).then(function() {
            knex.destroy();
        });
        done()
    })
})
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
    it("should not be able to create a new prescription with invalid data", async () => {
        const data = {
            clinic_id: 1,
            physician_id: 1,
            patient_id:1,
            text: ""
        }

        try {
            expect(await CreatePrescription(data)).toThrowError()

        } catch (error: Error | any) {
            expect(error.description).toBe("text is undefined, null or empty")
        }


    })
    afterAll(done => {
        let options = {
            ignoreTables: ['knexMigrations', 'knexMigrations_lock']
        }

        knexCleaner.clean(knex, options).then(function() {
            knex.destroy();
        });
        done()
    })
})
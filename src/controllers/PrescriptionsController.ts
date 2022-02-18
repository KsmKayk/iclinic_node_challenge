import {Request, Response} from "express"
import CreatePrescription from "../services/CreatePrescription";

interface PrescriptionBody {
    clinic: Clinic,
    physician:Physician,
    patient:Patient,
    text: string
}

interface Clinic {
    id: number
}
interface Physician {
    id: number
}
interface Patient {
    id: number
}


module.exports = {
    async store(req:Request, res:Response) {
        const data: PrescriptionBody = req.body

        try {
            const prescription = await CreatePrescription({clinic_id: data.clinic.id, text: data.text, patient_id: data.patient.id, physician_id:data.physician.id})
            return res.status(200).json(prescription)
        } catch (e: Error | any) {
            return res.status(e.httpCode).json({
                error: {
                    message: e.message,
                    code: e.code
                }})
        }

    }
}
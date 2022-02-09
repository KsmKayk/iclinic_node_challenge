import knex from "../database/index"

interface PrescriptionData{
    id?: number,
    clinic_id: number,
    physician_id: number,
    patient_id: number,
    text: string
}

export default async function CreatePrescription(
    {clinic_id, physician_id, text, patient_id}:PrescriptionData
): Promise<PrescriptionData | void> {
    let response = {
        clinic_id,
        physician_id,
        text,
        patient_id
    }

    return response
}
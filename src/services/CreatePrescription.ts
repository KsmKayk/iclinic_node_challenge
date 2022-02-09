import knex from "../database/index"

interface PrescriptionData{
    id?: number,
    clinic_id: number,
    physician_id: number,
    patient_id: number,
    text: string
}

interface IdResponse {
    id:number
}

export default async function CreatePrescription(
    {clinic_id, physician_id, text, patient_id}:PrescriptionData
): Promise<PrescriptionData | void> {

    const response = await knex("prescriptions").insert({
        clinic_id,
        physician_id,
        patient_id,
        text
    }, "id").then(function (id:IdResponse[]) {

        const response = {
            id: id[0].id,
            clinic: {
                id: clinic_id
            },
            physician:{
                id: physician_id
            },
            patient: {
                id: patient_id
            },
            text
        }

        return response

    })

    return response


}
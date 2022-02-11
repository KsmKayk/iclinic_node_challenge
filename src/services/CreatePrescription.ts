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

    const verify = verifyData({clinic_id, physician_id, text, patient_id})
    if(verify !== true) {
        throw new Error(verify)
    }
    const response = await AddPrescriptionToDatabase({clinic_id, physician_id, text, patient_id})

    return response
}

function verifyData(
    {clinic_id, physician_id, text, patient_id}:PrescriptionData
): true | string {

    if (clinic_id === undefined || clinic_id === null) {
        const errorString = "clinic_id is undefined or null"
        return errorString
    }
    if (physician_id === undefined || physician_id === null) {
        const errorString = "physician_id is undefined or null"
        return errorString
    }
    if (patient_id === undefined || patient_id === null) {
        const errorString = "patient_id is undefined or null"
        return errorString
    }
    if (text === undefined || text === null || text === "") {
        const errorString = "text is undefined, null or empty"
        return errorString
    }

    return true

}

async function AddPrescriptionToDatabase(
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
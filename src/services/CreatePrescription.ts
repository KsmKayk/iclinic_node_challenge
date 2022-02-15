import knex from "../database/index"
import ApiError from "../utils/ApiError"
import * as rax from 'retry-axios';
import axios from 'axios';

interface PrescriptionData{
    id?: number,
    clinic_id: number,
    physician_id: number,
    patient_id: number,
    text: string
}

interface PhysicianData {
    id:string,
    crm: string,
    name:string
}
interface ClinicData {
    id:string,
    name:string
}
interface PhysicianData {
    id:string,
    email: string,
    phone: string,
    name:string
}

interface IdResponse {
    id:number
}

interface ErrorObject {
    message: string,
    code: number,
    httpCode: number,
    description:string
}

export default async function CreatePrescription(
    {clinic_id, physician_id, text, patient_id}:PrescriptionData
): Promise<PrescriptionData | void> {

    const verify = verifyData({clinic_id, physician_id, text, patient_id})
    if(verify !== true) {
        throw new ApiError(verify)
    }
    const response = await AddPrescriptionToDatabase({clinic_id, physician_id, text, patient_id})

    return response
}

function verifyData(
    {clinic_id, physician_id, text, patient_id}:PrescriptionData
): true | ErrorObject {

    if (clinic_id === undefined || clinic_id === null) {
        const Error:ErrorObject = {
            message: "malformed request",
            code: 1,
            httpCode: 400,
            description: "clinic_id is undefined or null"
        }

        return Error

    }
    if (physician_id === undefined || physician_id === null) {
        const Error:ErrorObject = {
            message: "malformed request",
            code: 1,
            httpCode: 400,
            description: "physician_id is undefined or null"
        }

        return Error
    }
    if (patient_id === undefined || patient_id === null) {
        const Error:ErrorObject = {
            message: "malformed request",
            code: 1,
            httpCode: 400,
            description: "patient_id is undefined or null"
        }

        return Error
    }
    if (text === undefined || text === null || text === "") {
        const Error:ErrorObject = {
            message: "malformed request",
            code: 1,
            httpCode: 400,
            description: "text is undefined, null or empty"
        }

        return Error
    }

    return true

}

async function FetchPhysician():Promise<PhysicianData | void> {}

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
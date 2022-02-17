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

interface PatientData {
    id:string,
    name:string,
    phone:string,
    email:string
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
    crm: string,
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


    verifyData({clinic_id, physician_id, text, patient_id})
    const prescriptionData = await AddPrescriptionToDatabase({clinic_id, physician_id, text, patient_id})
    let clinicData: boolean | ClinicData = false

    try {
        clinicData = await FetchClinic(clinic_id)
    } catch (e) {
        clinicData = false
    }

    try {
        const physicianData = await FetchPhysician(physician_id)
        const patientData = await FetchPatient(patient_id)
    } catch (e: Error | any) {
        const error = {
            message: e.message,
            code: e.code,
            httpCode: e.httpCode,
            description: e.description

        }

        await knex("prescriptions").where("id", prescriptionData.id).del()
        throw new ApiError(error)
    }



    return prescriptionData
}

function verifyData(
    {clinic_id, physician_id, text, patient_id}:PrescriptionData
): void {

    if (clinic_id === undefined || clinic_id === null) {
        const Error:ErrorObject = {
            message: "malformed request",
            code: 1,
            httpCode: 400,
            description: "clinic_id is undefined or null"
        }

        throw new ApiError(Error)

    }
    if (physician_id === undefined || physician_id === null) {
        const Error:ErrorObject = {
            message: "malformed request",
            code: 1,
            httpCode: 400,
            description: "physician_id is undefined or null"
        }

        throw new ApiError(Error)
    }
    if (patient_id === undefined || patient_id === null) {
        const Error:ErrorObject = {
            message: "malformed request",
            code: 1,
            httpCode: 400,
            description: "patient_id is undefined or null"
        }

        throw new ApiError(Error)
    }
    if (text === undefined || text === null || text === "") {
        const Error:ErrorObject = {
            message: "malformed request",
            code: 1,
            httpCode: 400,
            description: "text is undefined, null or empty"
        }

        throw new ApiError(Error)
    }

}

async function AddPrescriptionToDatabase(
    {clinic_id, physician_id, text, patient_id}:PrescriptionData
): Promise<PrescriptionData> {
    try {
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
    } catch (e) {
        const error:ErrorObject = {
            message: "Internal server error",
            description: "Error while trying insert data in prescriptions",
            code: 7,
            httpCode: 500
        }

        throw new ApiError(error)
    }

}

async function FetchPhysician(physician_id:number):Promise<PhysicianData | void> {
        const url = process.env.DEPENDENTS_URL
        const retry = process.env.PHYSICIANS_RETRY
        const timeout = process.env.PHYSICIANS_TIMEOUT
        const token = process.env.PHYSICIANS_TOKEN

        if(retry === undefined) {
            throw new Error( "Can't find retry env config")
        }
        if(token === undefined) {
            throw new Error( "Can't find token env config")
        }
        if(timeout === undefined) {
            throw new Error( "Can't find timeout env config")
        }
        if(url === undefined) {
            throw new Error( "Can't find url env config")
        }

        const physician = await axios({
            url: `${url}/physicians/${physician_id.toString()}`,
            method: "GET",
            timeout: parseInt(timeout),
            headers: {
               Authorization: token
            },
            raxConfig: {
                retry: parseInt(retry)
            }
        }).then((response) => {
            return response.data
        }).catch((e) => {
            console.log(e.response.status)
            if (e.response.status == 404) {
                const error: ErrorObject = {
                    message: "physician not found",
                    httpCode: 404,
                    code: 2,
                    description: "physician not found"
                }

                throw new ApiError(error)
            }

            if (e.response.status == 503) {
                const error: ErrorObject = {
                    message: "physicians service not available",
                    httpCode: 503,
                    code: 5,
                    description: "physicians service not available"
                }

                throw new ApiError(error)
            }
        })

    return physician

}

async function FetchClinic(clinic_id:number):Promise<ClinicData> {
    const url = process.env.DEPENDENTS_URL
    const retry = process.env.CLINICS_RETRY
    const timeout = process.env.CLINICS_TIMEOUT
    const token = process.env.CLINICS_TOKEN

    if(retry === undefined) {
        throw new Error( "Can't find retry env config")
    }
    if(token === undefined) {
        throw new Error( "Can't find token env config")
    }
    if(timeout === undefined) {
        throw new Error( "Can't find timeout env config")
    }
    if(url === undefined) {
        throw new Error( "Can't find url env config")
    }

    const clinic = await axios({
        url: `${url}/clinics/${clinic_id.toString()}`,
        method: "GET",
        timeout: parseInt(timeout),
        headers: {
            Authorization: token
        },
        raxConfig: {
            retry: parseInt(retry)
        }
    }).then((response) => {
        return response.data

    }).catch((e) => {
        console.log(e.response.status)
        if (e.response.status == 404) {
            const error: ErrorObject = {
                message: "clinic not found",
                httpCode: 404,
                code: 2,
                description: "clinic not found"
            }

            throw new ApiError(error)
        }

        if (e.response.status == 503) {
            const error: ErrorObject = {
                message: "clinic service not available",
                httpCode: 503,
                code: 5,
                description: "clinic service not available"
            }

            throw new ApiError(error)
        }
    })

    return clinic

}

async function FetchPatient(patient_id:number):Promise<PatientData | void> {
    const url = process.env.DEPENDENTS_URL
    const retry = process.env.PATIENTS_RETRY
    const timeout = process.env.PATIENTS_TIMEOUT
    const token = process.env.PATIENTS_TOKEN

    if(retry === undefined) {
        throw new Error( "Can't find retry env config")
    }
    if(token === undefined) {
        throw new Error( "Can't find token env config")
    }
    if(timeout === undefined) {
        throw new Error( "Can't find timeout env config")
    }
    if(url === undefined) {
        throw new Error( "Can't find url env config")
    }

    const patient = await axios({
        url: `${url}/patients/${patient_id.toString()}`,
        method: "GET",
        timeout: parseInt(timeout),
        headers: {
            Authorization: token
        },
        raxConfig: {
            retry: parseInt(retry)
        }
    }).then((response) => {
        return response.data
    }).catch((e) => {
        console.log(e.response.status)
        if (e.response.status == 404) {
            const error: ErrorObject = {
                message: "patient not found",
                httpCode: 404,
                code: 2,
                description: "patient not found"
            }

            throw new ApiError(error)
        }

        if (e.response.status == 503) {
            const error: ErrorObject = {
                message: "patients service not available",
                httpCode: 503,
                code: 5,
                description: "patients service not available"
            }

            throw new ApiError(error)
        }
    })

    return patient

}



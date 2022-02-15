interface ErrorObject {
    message: string,
    code: number,
    httpCode: number,
    description:string
}

export default class ApiError extends Error {
    code: number
    httpCode:number
    description:string

    constructor ({message, code, httpCode, description}:ErrorObject) {
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name
        this.code = code
        this.httpCode = httpCode
        this.description = description
    }

}


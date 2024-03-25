import {Response} from 'express'

export class ResponseHelper{

    public sendSuccessReponse(res:Response,status:number,message:string="",data:any=[]) {
        
        let responseBody = {
            success: true,
            message,
            status: status,
            data
        }

        return res.status(status).json(responseBody)
    }

    public sendErrorReponse(res:Response,status:number,message:string="",errors:any={},data:any=[]) {
        
        let responseBody = {
            success: false,
            message,
            status: status,
            errors,
            data
        }

        return res.status(status).json(responseBody)
    }
}
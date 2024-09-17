import { RequestWithUser } from "@/interfaces/IUser"
import { NextFunction, Response } from "express"

export const checkRole = (...allowRoles:string[]) => {
    return (req:RequestWithUser, res:Response, next:NextFunction) => {
        const user = req.user;
        if (user && allowRoles.includes(user.role)) {
            next()
        }else {
            res.status(403).send({errpr:'Permission denied'})
        }
    }
}
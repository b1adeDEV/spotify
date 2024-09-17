import { RequestWithUser } from "@/interfaces/IUser";
import { userRepo } from "@/repositories/user.repository";
import { RequestHandler } from "express";



export const authValidate:RequestHandler = async(req:RequestWithUser, res, next):Promise<any> => {
    try {
        const token = req.header('Authorization')
        if(!token) return res.status(401).send({message:'Invalid token'})
        
        const user = await userRepo.findToken(token)
        if (!user[0]) return res.status(401).send({message:'User not found'})
        req.user = user[0]
        next()
    } catch (error) {
        return res.status(500).send({message:'Internal error'})
    }
}
import { Request } from "express"

export enum UserRole  {
    user="user",
    administrator="administrator"
}

interface IUser {
    id:number
    username: string
    password: string
    role: string
}

export interface RequestWithUser extends Request {
    user?: IUser
}
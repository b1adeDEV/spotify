import {Navigate} from "react-router-dom";
import {ReactNode} from "react";

type TProps = {
    token: string
    role?:string
    children: ReactNode
}
export const ProtectedRoute = ({token, role, children}: TProps) => {
    if(!token) return <Navigate to={'/auth'}/>
    if(!token) {
        return <Navigate to={'/auth'}/>
    }else {
        if(role==="administrator") {
            return children
        }else {    
            return children
        }
    }
}

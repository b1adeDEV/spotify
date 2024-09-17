import {FormLogin} from "../../components/form/formLogin/formLogin.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {useRegisterMutation, useSignInMutation} from "../../store/artist.api.ts";
import {useActions} from "../../hooks/useActions.ts";
import {useNavigate} from "react-router-dom";
import { Alert } from "antd";

type State = {
    username: string
    password: string
}


export const FormContainer = () => {

    const [signIn] = useSignInMutation();
    const [register] = useRegisterMutation()
    const {addToken, addUser} = useActions()
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [checkboxState, setCheckBoxState] = useState(false)
    const [login, setLogin] = useState(true)
    const [message, setMessage] = useState("")
    const [state, setState] = useState<State>({
        username: "",
        password: ""
    })

    useEffect(() => {
        setState({
            username: "",
            password: ""
        })
    }, [login]);

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        const {name, value} = event.target;
        setState({...state, [name]: value})
    }

    const onLogin = async () => {
        if(state.username==""|| state.password=="") {
            setMessage("Fill in all fields")
            openAlert()
        }else{
            try {
                const data = await signIn(state).unwrap()
                localStorage.setItem("tokenSpotify", data.token)
                localStorage.setItem("role",data.role)
                addToken(data.token)
                addUser(data)
                if(checkboxState) {
                    localStorage.setItem("tokenSpotify", data.token)
                    localStorage.setItem("role",data.role)
                }
                navigate("/")
            }catch(e:any) {
                openAlert()
                setMessage(e.data)
                
            }
        }
    }

    const openAlert = () => {
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 2000);
    }

    const onRegister = async() => {
        if(state.username==""|| state.password=="") {
            setMessage("Fill in all fields")
            openAlert()
        }else {
            await register(state).unwrap()
            const data = await signIn(state).unwrap()
            addToken(data.token)
            addUser(data)
            navigate("/")
        }
    }

    const checkbox = (event:ChangeEvent<HTMLInputElement>) => {
        setCheckBoxState(event.target.checked)
    }

    const auth = () => {
        setLogin(!login)
        setState({
            username:"",
            password:""
        })
    }

    return (
        <>
        <div className={error?"CustomAlert": "none"}>
        <Alert
        message="ERROR"
        description={message}
        type="error"
             />
        </div>
        <FormLogin login={login}
        onChangeUsername={(e) => onChangeValue(e)}
        onChangePassword={(e) => onChangeValue(e)}
        auth={auth}
        onLoginBtn={onLogin}
        onRegisterBtn={onRegister} 
        passwordValue={state.password} 
        usernameValue={state.username} 
        switchCase={(e) =>checkbox(e)}/>
        </>
    )
}
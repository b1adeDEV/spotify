import { FaSpotify } from "react-icons/fa"
import "./formLogin.css"
import { ChangeEventHandler, MouseEventHandler } from "react"

type TProps = {
    onChangeUsername: ChangeEventHandler<HTMLInputElement>
    onChangePassword: ChangeEventHandler<HTMLInputElement>
    onLoginBtn: MouseEventHandler<HTMLButtonElement>
    onRegisterBtn: MouseEventHandler<HTMLButtonElement>
    login: boolean
    auth: MouseEventHandler<HTMLButtonElement>
    usernameValue:string
    passwordValue: string
    switchCase: ChangeEventHandler<HTMLInputElement>
}


export const FormLogin = (props:TProps) => {


    return (
        <div className="wrapper">
            <div className="formWrapper">
                <div className="formTitle">
                    <div><FaSpotify /></div>
                    <h1>{props.login?"Войти":"Зарегистрироваться"} в Spotify</h1>
                </div>
                <hr />
                <div className="input inputUsername">
                    <label>
                        Имя пользователя
                    </label>
                    <input value={props.usernameValue} name={"username"} onChange={props.onChangeUsername} type="text"
                           placeholder="Имя пользователя"/>
                </div>
                <div className=" input inputPassword">
                    <label>
                        Пароль
                    </label>
                    <input value={props.passwordValue} name={"password"} type="password" onChange={props.onChangePassword}
                           placeholder="Пароль"/>
                </div>
                {
                    props.login?<div className="switchCase">
                    <label className="switch">
                        <input onChange={props.switchCase} type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                    <p>Запомнить меня</p>
                </div>:""
                }
                <div className={"btnAuth"}>
                    <button onClick={props.login?props.onLoginBtn:props.onRegisterBtn}>{props.login?"Войти":"Зарегистрироваться"}</button>
                </div>
                <hr />
                <div className="createAccount">
                    {props.login ?
                        <>
                            Нет аккаунта?
                            <button onClick={props.auth}>Регистрация в Spotify</button>
                        </>
                        :   <>
                            Уже есть аккаунт?
                            <button onClick={props.auth}>Войдите в него.</button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

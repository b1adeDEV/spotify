import { ChangeEventHandler, MouseEventHandler, LegacyRef } from "react"
import { FaSpotify } from "react-icons/fa"

type TProps = {
    onChangeName: ChangeEventHandler<HTMLInputElement>
    onChangeInformation: ChangeEventHandler<HTMLInputElement>
    onAddBtn: MouseEventHandler<HTMLButtonElement>
    nameValue:string
    informationValue: string
    photoRef: LegacyRef<HTMLInputElement>
    onFileChange: ChangeEventHandler<HTMLInputElement>
    browsePhoto: MouseEventHandler<HTMLButtonElement>
    onPhotoInputChange: ChangeEventHandler<HTMLInputElement>
    fileName:string
}


export const AddArtist = (props:TProps) => {
    return (
        <div className="formWrapper">
                <div className="formTitle">
                    <div><FaSpotify /></div>
                    <h1>Добавление артиста</h1>
                </div>
                <hr />
                <div className="input inputUsername">
                    <label>
                        Имя
                    </label>
                    <input value={props.nameValue} name={"name"} onChange={props.onChangeName} type="text"
                           placeholder="Имя исполнителя"/>
                </div>
                <input type={"file"} ref={props.photoRef} onChange={props.onFileChange} name={"file"} style={{display: 'none'}}/>
                <div className={"customInput"}>
                            <input disabled value={props.fileName} name={"fileName"} onChange={props.onPhotoInputChange}/>
                            <button className="customBtn" onClick={ props.browsePhoto}>Browse</button>
                </div>
                <div className=" input inputPassword">
                    <label>
                        Информация
                    </label>
                    <input value={props.informationValue} name={"information"} type="text" onChange={props.onChangeInformation}
                           placeholder=""/>
                </div>
                <div className={"btnAuth"}>
                    <button onClick={props.onAddBtn}>Добавить артиста</button>
                </div>
            </div>
    )
}

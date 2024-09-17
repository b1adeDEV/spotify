import { Select } from "antd"
import { BaseOptionType, DefaultOptionType } from "antd/es/cascader"
import { ChangeEventHandler, MouseEventHandler, LegacyRef } from "react"
import { FaSpotify } from "react-icons/fa"

type TProps = {
    onChangeName: ChangeEventHandler<HTMLInputElement>
    onChangeYear: ChangeEventHandler<HTMLInputElement>
    onAddBtn: MouseEventHandler<HTMLButtonElement>
    nameValue:string
    yearValue: string
    photoRef: LegacyRef<HTMLInputElement>
    onFileChange: ChangeEventHandler<HTMLInputElement>
    browsePhoto: MouseEventHandler<HTMLButtonElement>
    onPhotoInputChange: ChangeEventHandler<HTMLInputElement>
    fileName:string
    onSelectChange:any
    selectArray: (BaseOptionType | DefaultOptionType)[]
}


export const AddAlbum = (props:TProps) => {
    return (
        <div className="formWrapper">
                <div className="formTitle">
                    <div><FaSpotify /></div>
                    <h1>Добавление альбома</h1>
                </div>
                <hr />
                <div className="input inputUsername">
                    <label>
                        Название
                    </label>
                    <input value={props.nameValue} name={"name"} onChange={props.onChangeName} type="text"placeholder="Альбом"/>
                </div>
                <input type={"file"} ref={props.photoRef} onChange={props.onFileChange} name={"file"} style={{display: 'none'}}/>
                <div className={"customInput"}>
                            <input disabled value={props.fileName} name={"fileName"} onChange={props.onPhotoInputChange}/>
                            <button className="customBtn" onClick={ props.browsePhoto}>Browse</button>
                </div>
                <div className="input inputPassword">
                    <label>
                        Год выпуска
                    </label>
                    <input value={props.yearValue} name={"year"} type="number" onChange={props.onChangeYear}placeholder=""/>
                </div>
                <div className="input">
                    <label>Исполнитель</label>
                    <Select
                    defaultValue="-"
                    className="customSelect"
                    style={{ width: 280,backgroundColor: '#f0f0f0', borderRadius: '4px' }}
                    dropdownStyle={{ backgroundColor: '#ffffff', borderRadius: '4px' }}
                    onChange={props.onSelectChange}
                    options={props.selectArray}
                />
                </div>
                
                <div className={"btnAuth"}>
                    <button onClick={props.onAddBtn}>Добавить альбом</button>
                </div>
            </div>
    )
}

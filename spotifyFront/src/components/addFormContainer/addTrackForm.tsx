import { Select } from "antd"
import { BaseOptionType, DefaultOptionType } from "antd/es/cascader"
import { ChangeEventHandler, MouseEventHandler, LegacyRef } from "react"
import { FaSpotify } from "react-icons/fa"

type TProps = {
    onChangeName: ChangeEventHandler<HTMLInputElement>
    onChangeYear: ChangeEventHandler<HTMLInputElement>
    onAddBtn: MouseEventHandler<HTMLButtonElement>
    nameValue:string
    durationValue: string
    onSelectChange:any
    selectArray: any
}


export const AddTrackForm = (props:TProps) => {
    return (
        <div className="formWrapper">
                <div className="formTitle">
                    <div><FaSpotify /></div>
                    <h1>Добавление трека</h1>
                </div>
                <hr />
                <div className="input inputUsername">
                    <label>
                        Название
                    </label>
                    <input value={props.nameValue} name={"name"} onChange={props.onChangeName} type="text"placeholder="Имя исполнителя"/>
                </div>
                <div className="input inputPassword">
                    <label>
                        Длительность
                    </label>
                    <input value={props.durationValue} name={"duration"} type="text" onChange={props.onChangeYear} placeholder="0:00"/>
                </div>
                <div className="input">
                    <label>
                        Альбом
                    </label>
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
                    <button onClick={props.onAddBtn}>Добавить трек</button>
                </div>
            </div>
    )
}

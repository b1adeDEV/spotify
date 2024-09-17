import {Track} from "../../containers/trackContainers/trackContainers.tsx";
import "./cardTrack.css"



export const CardTrack = (props:Track) => {

    return (
        <div onClick={props.onClickHandler} className={"track"} key={props.id}>
            <div className={"trackTitle"}>
                <p>{props.number + 1}</p>
                <h2>{props.name}</h2>
            </div>
            {
                    props.isHistory? <p style={{opacity:0.3}}>Прослушано: {new Date(props.date!).toLocaleString()}</p>:""
            }
            <div className={"trackDur"}>
                <h3>{props.duration}</h3>
            </div>
        </div>
    )
}
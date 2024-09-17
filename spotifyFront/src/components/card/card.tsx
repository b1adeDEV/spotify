import "./card.css"
import {MouseEventHandler} from "react";

type TProps = {
    name: string;
    image: string;
    ClickCard: MouseEventHandler<HTMLDivElement>
}

export const Card = (props:TProps) => {
    return (
        <div onClick={props.ClickCard} className={"card"}>
            <img src={"http://localhost:8000/uploads/" + props.image} alt="Artist"/>
            <p>{props.name}</p>
            <h5>Исполнитель</h5>
        </div>
    )
}
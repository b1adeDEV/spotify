import "./albumCard.css"
import {MouseEventHandler} from "react";

type TProps = {
    name: string;
    image: string;
    ClickCard: MouseEventHandler<HTMLDivElement>
    year:string
}

export const AlbumCard = (props:TProps) => {
    return (
        <div onClick={props.ClickCard} className={"cardAlbum"}>
            <img src={"http://localhost:8000/uploads/" + props.image} alt="Artist"/>
            <h3>{props.name}</h3>
            <p>{props.year} Альбом</p>
        </div>
    )
}
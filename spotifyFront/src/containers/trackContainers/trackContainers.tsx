import {useParams} from "react-router-dom";
import {useGetTrackMutation, useHistoryMutation} from "../../store/artist.api.ts";
import {useActions} from "../../hooks/useActions.ts";
import {MouseEventHandler, useEffect} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import "./trackContainers.css"
import {LuClock3} from "react-icons/lu";
import {CardTrack} from "../../components/cardTrack/cardTrack.tsx";


export interface Track {
    id: number;
    name: string;
    duration: string;
    onClickHandler: MouseEventHandler;
    number: number;
    isHistory: boolean
    date?:string
}
interface Tracks {
    id: number;
    name: string;
    year: string;
    image: string;
    tracks: Track[];
}

export const TrackContainers = () => {
    const data:Tracks = useTypedSelector(state => state["music"].oneTrackInfo[0])
    const {id} = useParams()
    const [history] = useHistoryMutation()
    const [getOneInfo, {isSuccess}] = useGetTrackMutation()
    const {addTrackInfo} = useActions()
    const {token} = useTypedSelector(state => state["music"])
    

    const getInfo = async () => {
        const res = await getOneInfo({id: String(id!),
            token:token
    }).unwrap()
        addTrackInfo(res)
    }

    useEffect(() => {
        getInfo()
    }, []);


    const clickTrackHandler = async(id:number) => {
        const data = {
            token:token,
            historyTrack: {
                track:id
            }
        }
        await history(data).unwrap()
    }


    return (
        <div className={"container"}>
            {
                isSuccess ? <div>
                    <div className={"trackHeader"}>
                        <div className="image-container">
                            <img src={"http://localhost:8000/uploads/" + data.image} alt="Photo"/>
                        </div>
                        <div className={"trackHeaderText"}>
                            <h5>Альбом</h5>
                            <h1>{data.name}</h1>
                            <p>{data.year}</p>
                        </div>
                    </div>
                    <div className={"line"}>
                        <div className={"lineTitle"}>
                            <p>#</p>
                            <p>Название</p>
                        </div>
                        <div style={{fontSize: "20px"}}>
                            <LuClock3 />
                        </div>
                    </div>
                    <div>
                        {
                            data.tracks.map((track: Track, index) => (
                                <CardTrack id={track.id} name={track.name} number={index} duration={track.duration} onClickHandler={() => clickTrackHandler(track.id)} isHistory={false}/>
                            ))
                        }
                    </div>
                </div> : ""
            }
        </div>
    )
}
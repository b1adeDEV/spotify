import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useActions} from "../../hooks/useActions.ts";
import {useGetAlbumsMutation} from "../../store/artist.api.ts";
import {AlbumCard} from "../../components/albumCard/albumCard.tsx";
import {TCard} from "../../types/card.ts";
import "./albumContainers.css"
import {AlbumHeader} from "../../components/albumHeader/albumHeader.tsx";

interface Album {
    id: number;
    name: string;
    year: string;
    image: string;
}
interface IAlbum {
    id: number;
    name: string;
    image: string;
    information: string;
    albums: Album[];
}

export const AlbumContainers = () => {

    const data:IAlbum[] = useTypedSelector(state => state["music"].oneAlbumInfo)
    const {id} = useParams()
    const [getOneInfo, {isSuccess}] = useGetAlbumsMutation()
    const {addMusicInfo} = useActions()
    const navigate = useNavigate()
    const getInfo = async () => {
        const res = await getOneInfo(id).unwrap()
        addMusicInfo(res)
    }
    useEffect(() => {
        getInfo()
    }, []);

    const onClickAlbum = (id:number) => {
        navigate(`/albums/${id}`)
    }

    return (
        <>
            <AlbumHeader img={data[0]?.image} title={data[0]?.name}/>
            <div className={"container"}>
                <h1>Популярные Альбомы</h1>
                <div className="albumContainer">
                    {
                        isSuccess ? data[0].albums?.map((item: TCard,) => {
                            return (
                                <AlbumCard key={item.id} image={item.image} name={item.name} ClickCard={() => onClickAlbum(item.id)} year={item.year?item.year:""}/>
                            )
                        }) : ""
                    }
                </div>
            </div>

        </>
    )
}
import {Card} from "../../components/card/card.tsx";
import "./cardContainers.css"
import {useGetArtistsQuery} from "../../store/artist.api.ts";
import {TCard} from "../../types/card.ts";
import {useNavigate} from "react-router-dom";

export const CardContainers = () => {

    const {data, isLoading, error} = useGetArtistsQuery('')
    const navigate = useNavigate();


    const onClickCard = async(id:number) => {
        navigate(`/album/${id}`)
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return (
        <div className={"container"}>
            <h1>Популярные исполнители</h1>
            <div className="ArtistContainers">
                {
                    data.map((item:TCard) => {
                        return(
                            <Card key={item.id} image={item.image} name={item.name} ClickCard={() => onClickCard(item.id)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
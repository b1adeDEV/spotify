import { useEffect } from "react"
import { AdminArtist } from "../../components/adminPage/adminArtist"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDeletePublishArtistMutation, useGetAllArtistMutation, usePublishArtistMutation } from "../../store/artist.api"

export const AdminArtistContainer = () => {

    const [getAllArtist,{data, isLoading, isSuccess}] = useGetAllArtistMutation()

    const [deletePublish] = useDeletePublishArtistMutation()
    const [publish] = usePublishArtistMutation()

    const {token} = useTypedSelector(state => state.music)

    useEffect(() => {
        getAllArtist(token)
    }, [])

    const onDelete = (id:number) => {
        deletePublish({id, token})
        setTimeout(() => {
            getAllArtist(token)
        }, 1000);
        
    }

    const onPublish = (id:number) => {
        publish({id,token})
        setTimeout(() => {
            getAllArtist(token)
        }, 1000);
    }


    if(isLoading) return <div></div>

    if (isSuccess) return (
        <div className="container">
            <AdminArtist data={data} deleteArtist={onDelete} publishArtist={onPublish}/>
        </div>
    )
}

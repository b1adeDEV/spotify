import { useEffect } from "react"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDeletePublishTrackMutation, useGetAllTracksMutation, usePublishTrackMutation } from "../../store/artist.api"
import { AdminTrack } from "../../components/adminPage/adminTrack"

export const AdminTrackContainer = () => {
    const [getAllArtist,{data, isLoading, isSuccess}] = useGetAllTracksMutation()
    const {token} = useTypedSelector(state => state.music)
    const [deletePublish] = useDeletePublishTrackMutation()
    const [publish] = usePublishTrackMutation()

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
            <AdminTrack data={data} deleteTrack={onDelete} publishTrack={onPublish}/>
        </div>
    )
}

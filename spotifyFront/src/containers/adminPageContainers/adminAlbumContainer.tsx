import { useEffect } from "react"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { AdminAlbum } from "../../components/adminPage/adminAlbum"
import { useDeletePublishAlbumMutation, useGetAllAlbumMutation, usePublishAlbumMutation } from "../../store/artist.api"

export const AdminAlbumContainer = () => {
    const [getAllAlbum,{data, isLoading, isSuccess}] = useGetAllAlbumMutation()
    const [deletePublish] = useDeletePublishAlbumMutation()
    const [publish] = usePublishAlbumMutation()
    const {token} = useTypedSelector(state => state.music)

    useEffect(() => {
        getAllAlbum(token)
    }, [])

    const onDelete = (id:number) => {
        deletePublish({id, token})
        setTimeout(() => {
            getAllAlbum(token)
        }, 1000);
        
    }

    const onPublish = (id:number) => {
        publish({id,token})
        setTimeout(() => {
            getAllAlbum(token)
        }, 1000);
    }

    if(isLoading) return <div></div>

    if (isSuccess) return (
        <div className="container">
            <AdminAlbum data={data} deleteAlbum={onDelete} publishAlbum={onPublish}/>
        </div>
    )
}

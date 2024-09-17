import { useEffect } from "react"
import { CardTrack } from "../../components/cardTrack/cardTrack"
import { useGetHistoryMutation } from "../../store/artist.api"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useActions } from "../../hooks/useActions"

export const HistoryContainer = () => {

    const state = useTypedSelector(state => state["music"])
    const {addHistoryList} = useActions()
    const [trackHistory, isSuccess] = useGetHistoryMutation()

    const getHistory = async () => {
        const {data} = await trackHistory(state.token)
        addHistoryList(data)
    }

    useEffect(() => {
        getHistory()
    },[])

    return (
        <div className="container">
            {
                isSuccess? state.history.map((item:any, index) => {
                    return (
                        <CardTrack id={item.track.id} 
                        name={item.track.name} 
                        date={item.date}
                        duration={item.track.duration} 
                        onClickHandler={() => {}} 
                        number={index} 
                        isHistory={true}/>  
                    )
                }).reverse():""
            }
        </div>
    )
}

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAddTrackMutation, useGetAllAlbumsQuery } from "../../store/artist.api";
import { Alert } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AddTrackForm } from "../../components/addFormContainer/addTrackForm";

export const AddTrackContainer = () => {

    const [formState, setFormState] = useState({
        name: '',
        duration: "",
        albums:0
    });

    const [addTrack] = useAddTrackMutation()

    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const {token} = useTypedSelector((state)=> state.music)
    const [select, setSelect] = useState([])
    
    const {data, isLoading, isSuccess} = useGetAllAlbumsQuery('')

    

    useEffect(() => {
        if(isSuccess) {
        const transformedArray = data.map((item:{name:string,id:string}) => ({
            label: item.name,
            value: item.id
        }));
        setSelect(transformedArray)
        }
    },[data])

    const handleInputChange = (event: { target: { name: string; value: string; }; }) => {const { name, value } = event.target; setFormState({...formState,[name]: value});};
    const openAlert = () => {
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 2000);
    }

    const onAddBtn = async() => {
        if(formState.name===""|| formState.duration==="" || formState.albums === 0) {
            setMessage("Fill in all fields")
            openAlert()
        }else{
            try {
                await addTrack({data: formState, token:token}).unwrap()
                navigate("/")
            }catch(e:any) {
                openAlert()
                setMessage(e.data)
            }
        }    
    }

    const onClickSelect = (id:number) => {
        setFormState({...formState, albums:id})
    }

    if(isLoading) return <div></div>
    
    return (
        <>
        <div className={error?"CustomAlert": "none"}>
        <Alert
        message="ERROR"
        description={message}
        type="error"
             />
        </div>

        <AddTrackForm
                onChangeName={(e) => handleInputChange(e)}
                onChangeYear={(e) => handleInputChange(e)}
                onAddBtn={onAddBtn}
                nameValue={formState.name}
                durationValue={formState.duration}
                onSelectChange={(e:any) => onClickSelect(e)} 
                selectArray={select}/>
        </>
    )
}

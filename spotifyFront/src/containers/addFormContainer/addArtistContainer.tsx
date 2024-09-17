import { ChangeEvent, useRef, useState } from "react"
import { AddArtist } from "../../components/addFormContainer/addArtistForm"
import { useNavigate } from "react-router-dom";
import { useAddArtistMutation } from "../../store/artist.api";
import { Alert } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const AddArtistContainer = () => {

    const [formState, setFormState] = useState({
        name: '',
        information: '',
        image:""
    });
    const [addArtist] = useAddArtistMutation()
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const {token} = useTypedSelector((state)=> state.music)
    


    const handleInputChange = (event: { target: { name: string; value: string; }; }) => {const { name, value } = event.target; setFormState({...formState,[name]: value});};
    
    

    const openAlert = () => {
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 2000);
    }



    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e?.target?.files?.[0]) {
            setFormState({
                name: formState.name,
                information: formState.information,
                image: e?.target?.files?.[0],
            })
            setFileName(e.target.files[0].name)
        }else {
            setFileName("")
        }
    }

    const activeInput = () => {
        if(inputRef.current) {
            inputRef.current.click();
        }
    }

    const onAddBtn = async() => {
        if(formState.name==""|| formState.information=="" || formState.image == "") {
            setMessage("Fill in all fields")
            openAlert()
        }else{
            try {
                const formData: FormData = new FormData();
                formData.append('name', formState.name);
                formData.append('information', formState.information);
                formData.append('image', formState.image)
                await addArtist({data: formData, token:token}).unwrap()
                navigate("/")
            }catch(e:any) {
                openAlert()
                setMessage(e.data)
            }
        }   
    }

    return (
        <>
        <div className={error?"CustomAlert": "none"}>
        <Alert
        message="ERROR"
        description={message}
        type="error"
        />
        </div>
        <AddArtist 
        onChangeName={(e)=>handleInputChange(e)} 
        onChangeInformation={(e)=>handleInputChange(e)} 
        onAddBtn={onAddBtn} 
        nameValue={formState.name} 
        informationValue={formState.information} 
        photoRef={inputRef} 
        onFileChange={onFileChange} 
        browsePhoto={activeInput} 
        onPhotoInputChange={(e) => handleInputChange(e)} 
        fileName={fileName}/>
        </>
    )
}

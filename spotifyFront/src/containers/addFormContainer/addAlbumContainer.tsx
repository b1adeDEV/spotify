import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAddAlbumMutation, useGetArtistsQuery } from "../../store/artist.api";
import { Alert } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AddAlbum } from "../../components/addFormContainer/addAlbumForm";

export const AddAlbumContainer = () => {

    const [formState, setFormState] = useState({
        name: '',
        year: "",
        image:"",
        artist:0
    });
    const [addAlbum] = useAddAlbumMutation()
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const {token} = useTypedSelector((state)=> state.music)
    const [select, setSelect] = useState([])
    const {data, isLoading, isSuccess} = useGetArtistsQuery('')

    

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
    

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e?.target?.files?.[0]) {
            setFormState({
                name: formState.name,
                year: formState.year,
                image: e?.target?.files?.[0],
                artist: formState.artist
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
        if(formState.name===""|| formState.year==="" || formState.image ==="" || formState.artist === 0) {
            setMessage("Fill in all fields")
            openAlert()
        }else{
            try {
                const formData: FormData = new FormData();
                formData.append('name', formState.name);
                formData.append('year', formState.year);
                formData.append('image', formState.image)
                formData.append('artist', String(formState.artist))
                await addAlbum({data: formData, token:token}).unwrap()
                navigate("/")
            }catch(e:any) {
                openAlert()
                setMessage(e.data)
            }
        }    
    }

    const onClickSelect = (id:number) => {
        setFormState({...formState, artist:id})
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

        <AddAlbum
                onChangeName={(e) => handleInputChange(e)}
                onChangeYear={(e) => handleInputChange(e)}
                onAddBtn={onAddBtn}
                nameValue={formState.name}
                yearValue={formState.year}
                photoRef={inputRef}
                onFileChange={onFileChange}
                browsePhoto={activeInput}
                onPhotoInputChange={(e) => handleInputChange(e)}
                fileName={fileName} 
                onSelectChange={(e:any) => onClickSelect(e)} 
                selectArray={select}/>
        </>
    )
}

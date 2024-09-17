import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {FaSpotify} from "react-icons/fa";
import {GoHome, GoPlus} from "react-icons/go";
import {CiMusicNote1, CiSearch} from "react-icons/ci";
import "./layout.css"
import {VscLibrary} from "react-icons/vsc";
import { IoIosArrowBack, IoIosArrowForward, IoMdPeople } from "react-icons/io";
import { useActions } from "../../hooks/useActions";
import { useLogoutMutation } from "../../store/artist.api";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { RiAlbumFill } from "react-icons/ri";
import { MdAudiotrack } from "react-icons/md";

type TProps = {
    token:string
    role?:string
}


export const Layout = (props:TProps) => {
    const navigate = useNavigate()
    const {clearToken} = useActions()
    const [logout] = useLogoutMutation()
    const {pathname} = useLocation()
    const {token} = useTypedSelector(state => state["music"])

    const onClick = async() => {
        await logout(token)
        clearToken()
    }
    return (
        <>
            <div className={"layout"}>
                <div className={"layoutMain"}>
                    <main>
                        <h1><FaSpotify/></h1>
                        <h1>Spotify</h1>
                    </main>
                    <div style ={{marginTop: "20px"}}>
                        <Link to={"/"}><GoHome/> Главная</Link>
                    </div>
                    <div style ={{marginTop: "20px"}}>
                        <Link to={""}><CiSearch/> Поиск</Link>
                    </div>
                    {
                        props.token!==""?
                            <div>
                                <Link to={"/history"}><CiMusicNote1 /> История</Link>
                            </div>
                            :""
                    }
                    {
                        props.role !== ""?<div>
                            <Link to={"/add-artist"}><IoMdPeople />Добавить Артиста</Link>
                        </div>:""
                    }
                    {
                        props.role !== ""?<div>
                            <Link to={"/add-album"}><RiAlbumFill />Добавить Альбом</Link>
                        </div>:""
                    }
                    {
                        props.role !== ""?<div>
                            <Link to={"/add-track"}><MdAudiotrack />Добавить Трек</Link>
                        </div>:""
                    }
                </div>
                <div className={"layoutMedia"}>
                    <div className={"media"}>
                        <div>
                            <VscLibrary/>
                        </div>
                        <h3>Моя медиатека</h3>
                        <button><GoPlus /></button>
                    </div>
                    <nav className={"navigation"}>
                    <a href="#">Юридическая информация</a>
                        <a href="#">Политика конфиденциальности</a>
                        <footer>
                            <a style={{marginRight:"20px"}} href="#">Файлы cookie</a>
                            <a href="#">О рекламе</a>
                        </footer>
                        <a href="#">Специальные возможности</a>
                    </nav>
                </div>
            </div>
            <div className="HeaderLayout">
                <div className={"buttonGroup"}>
                    <button  onClick={() => navigate(-1)} className={"btn"}><IoIosArrowBack /></button>
                    <button  onClick={() => navigate(1)} className={"btn"}><IoIosArrowForward /></button>
                </div>
                {
                    props.token === "" ? <div className="singInRegGroup">
                        <button onClick={() => navigate("/auth")} className={"btnRegister"}>Зарегистрироваться</button>
                        <button onClick={() => navigate("/auth")} className={"btnSignIn"}>Войти</button>
                    </div>: <div className={pathname.replace(/^\/([^\/]+).*/, '$1') === "admin"|| pathname==="/admin"?"btnAdminGroup":props.role ==="administrator" ? "btnGroupLayout" :""}>
                        {
                            pathname.replace(/^\/([^\/]+).*/, '$1') === "admin"|| pathname==="/admin"?<div className="adminGroup">
                                <button onClick={() => navigate("/admin/artist")} className={"btnSignIn"}>Artist</button>
                                <button onClick={() => navigate("/admin/album")} className={"btnSignIn"} >Album</button>
                                <button onClick={() => navigate("/admin/track")} className={"btnSignIn"} >Track</button>
                            </div>
                            
                            :props.role === "administrator"? <button onClick={() => navigate("/admin")} className={"btnSignIn"}>Admin panel</button>:""
                        }
                        <button onClick={onClick} className={"btnSignIn"}>Log Out</button>
                    </div>
                }
            </div>
            <Outlet/>

        </>
    )
}
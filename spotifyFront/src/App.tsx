import {CardContainers} from "./containers/artistContainer/cardContainers.tsx";
import {Route, Routes} from "react-router-dom";
import {AlbumContainers} from "./containers/albumContainer/albumContainers.tsx";
import {Layout} from "./components/layout/layout.tsx";
import {TrackContainers} from "./containers/trackContainers/trackContainers.tsx";
import {FormContainer} from "./containers/formContainer/formContainer.tsx";
import {useTypedSelector} from "./hooks/useTypedSelector.ts";
import {ProtectedRoute} from "./components/protectedRoute.tsx";
import { HistoryContainer } from "./containers/historyContainer/historyContainer.tsx";
import { useActions } from "./hooks/useActions.ts";
import { AddArtistContainer } from "./containers/addFormContainer/addArtistContainer.tsx";
import { AddAlbumContainer } from "./containers/addFormContainer/addAlbumContainer.tsx";
import { AddTrackContainer } from "./containers/addFormContainer/addTrackContainer.tsx";
import { AdminArtistContainer } from "./containers/adminPageContainers/adminArtistContainer.tsx";
import { AdminAlbumContainer } from "./containers/adminPageContainers/adminAlbumContainer.tsx";
import { AdminTrackContainer } from "./containers/adminPageContainers/adminTrackContainer.tsx";

function App() {
    const {addToken, addUser} = useActions()
    const localeToken = localStorage.getItem("tokenSpotify")
    const localeRole = localStorage.getItem("role")
    
    if(localeToken) {
        addToken(localeToken)
        addUser(localeRole)
    }
    const data = useTypedSelector(state => state["music"])
    return (
    <Routes>
        <Route path={"/"} element={<Layout token={data.token} role={data.user}/>}>
            <Route path={"/"} element={<CardContainers/>}/>
            <Route path={"/album/:id"} element={<AlbumContainers/>}/>
            <Route path={"/albums/:id"} element={<ProtectedRoute token={data.token}><TrackContainers/></ProtectedRoute>} />
            <Route path={"/history"} element={<ProtectedRoute token={data.token}><HistoryContainer/></ProtectedRoute>} />
            <Route path={"/add-artist"} element={<ProtectedRoute role={data.user}  token={data.token}><AddArtistContainer/></ProtectedRoute>} />
            <Route path={"/add-album"} element={<ProtectedRoute  role={data.user} token={data.token}><AddAlbumContainer/></ProtectedRoute>} />
            <Route path={"/add-track"} element={<ProtectedRoute role={data.user}  token={data.token}><AddTrackContainer/></ProtectedRoute>} />
            <Route path={"/admin"} element={<ProtectedRoute role={data.user} token={data.token}><AdminArtistContainer/></ProtectedRoute>} />
            <Route path={"/admin/artist"} element={<ProtectedRoute role={data.user} token={data.token}><AdminArtistContainer/></ProtectedRoute>} />
            <Route path={"/admin/album"} element={<ProtectedRoute role={data.user} token={data.token}><AdminAlbumContainer/></ProtectedRoute>} />
            <Route path={"/admin/track"} element={<ProtectedRoute role={data.user} token={data.token}><AdminTrackContainer/></ProtectedRoute>} />
        </Route>
        <Route path="/auth" element={<FormContainer/>}></Route>
    </Routes>
  )
}

export default App

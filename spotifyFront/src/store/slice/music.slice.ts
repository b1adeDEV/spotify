import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    oneAlbumInfo: [],
    oneTrackInfo:[],
    history:[],
    token:"",
    user:""
}

export const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        addMusicInfo: (state, action) => {
            state.oneAlbumInfo = action.payload
        },
        addTrackInfo: (state, action) => {
            state.oneTrackInfo = action.payload
        },
        addToken: (state, action) => {
            state.token = action.payload
        },
        addUser: (state, action) => {
            state.user = action.payload
        },
        addHistoryList: (state, action) => {
            state.history = action.payload
        },
        clearToken: (state) => {
            localStorage.removeItem("tokenSpotify")
            localStorage.removeItem("role")
            state.token=""
            state.user=""
        }
    }
})

export const musicReducer = musicSlice.reducer
export const musicActions = musicSlice.actions
import { configureStore } from "@reduxjs/toolkit";
import {MusicApi} from "./artist.api.ts";
import {musicReducer} from "./slice/music.slice.ts";

export const store = configureStore({
    reducer: { [MusicApi.reducerPath]: MusicApi.reducer, music: musicReducer },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(MusicApi.middleware)
})

export type TypeRootState = ReturnType<typeof store.getState>
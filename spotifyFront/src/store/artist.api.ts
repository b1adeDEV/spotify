import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const MusicApi = createApi({
    reducerPath: "api/shops",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:8000/"}),
    endpoints: build => ({
        getArtists: build.query({
            query: () => 'artists',
        }),
        getAlbums: build.mutation({
            query: (id) => `albums?artist=${id}` ,
        }),
        getTrack: build.mutation({
            query: (data) => ({url: `tracks?album=${data.id}`, method:'GET',headers:{'Content-Type':'application/json', authorization:`${data.token}`}}),
        }),
        signIn: build.mutation({
            query: (data) => ({body:data, url:'users/sessions', method:'POST'}),
        }),
        register: build.mutation({
            query: (data) => ({body:data, url:'users', method:'POST'}),
        }),
        history: build.mutation({
            query: (data) => ({body:data.historyTrack, url:'track_history', method:'POST', headers:{'Content-Type':'application/json', authorization:`${data.token}`}}),
        }),
        getHistory: build.mutation({
            query:(token) => ({url:'track_history', method:'GET',headers:{'Content-Type':'application/json', authorization:`${token}`}})
        }),
        logout: build.mutation({
            query:(token) => ({url:'users/logout', method:'DELETE',headers:{'Content-Type':'application/json', authorization:`${token}`}})
        }),
        addArtist: build.mutation({
            query:(data) => ({body:data.data, url:'/artists', method:'POST',headers:{authorization:`${data.token}`}})
        }),
        addAlbum: build.mutation({
            query:(data) => ({body:data.data, url:'/albums', method:'POST',headers:{authorization:`${data.token}`}})
        }),
        addTrack: build.mutation({
            query:(data) => ({body:data.data, url:'/tracks', method:'POST',headers:{authorization:`${data.token}`}})
        }),
        getAllAlbums: build.query({
            query: () => `albums` ,
        }),
        getAllArtist: build.mutation({
            query:(token:string) => ({url:'/artists/all', method:'GET', headers:{authorization:`${token}`}})
        }),
        getAllAlbum: build.mutation({
            query:(token:string) => ({url:'/albums/all', method:'GET', headers:{authorization:`${token}`}})
        }),
        getAllTracks: build.mutation({
            query:(token:string) => ({url:'/tracks/all', method:'GET', headers:{authorization:`${token}`}})
        }),
        deletePublishAlbum: build.mutation({
            query:(data) => ({url:`/albums/all/${data.id}`, method:'DELETE', headers:{authorization:`${data.token}`}})
        }),
        publishAlbum: build.mutation({
            query:(data) => ({url:`/albums/all/${data.id}`, method:'POST', headers:{authorization:`${data.token}`}})
        }),
        deletePublishArtist: build.mutation({
            query:(data) => ({url:`/artists/all/${data.id}`, method:'DELETE', headers:{authorization:`${data.token}`}})
        }),
        publishArtist: build.mutation({
            query:(data) => ({url:`/artists/all/${data.id}`, method:'POST', headers:{authorization:`${data.token}`}})
        }),
        deletePublishTrack: build.mutation({
            query:(data) => ({url:`/tracks/all/${data.id}`, method:'DELETE', headers:{authorization:`${data.token}`}})
        }),
        publishTrack: build.mutation({
            query:(data) => ({url:`/tracks/all/${data.id}`, method:'POST', headers:{authorization:`${data.token}`}})
        }),
        
    }),
})

export const {
    useLogoutMutation,
    useGetArtistsQuery,
    useGetAlbumsMutation, 
    useGetTrackMutation, 
    useSignInMutation, 
    useRegisterMutation, 
    useHistoryMutation,
    useGetHistoryMutation,
    useAddArtistMutation,
    useAddAlbumMutation,
    useGetAllAlbumsQuery,
    useAddTrackMutation,
    useGetAllArtistMutation,
    useGetAllAlbumMutation,
    useGetAllTracksMutation,
    useDeletePublishAlbumMutation,
    usePublishAlbumMutation,
    useDeletePublishArtistMutation,
    usePublishArtistMutation,
    useDeletePublishTrackMutation,
    usePublishTrackMutation
} = MusicApi
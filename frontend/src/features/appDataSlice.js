import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playlists: [],
    modalIsOpen: false,
    user: null,
}

const appDataSlice = createSlice({
    name: "appData",
    initialState,
    reducers: {
        saveUser(state, action){
            state.user = action.payload;
        },
        savePlaylists(state, action){
            state.playlists = action.payload;
        },
        saveMovie(state, action){
            const playlistIndex = state.playlists?.findIndex(p => p?._id === action.payload.id)
            state.playlists[playlistIndex].movies.push(action.payload.movie);
        },
        deleteData(state, action){
            state.playlists = []
            state.user = null
        }
    }
});

export const {
    saveUser, savePlaylists, addPlaylist, saveMovie, deleteData
} = appDataSlice.actions

export const selectUser = state => state.appData.user;
export const selectPlaylists = state => state.appData.playlists;

export default appDataSlice.reducer
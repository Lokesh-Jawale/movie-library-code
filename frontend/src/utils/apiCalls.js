import axios from "axios";

let axiosConfig = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "authorization" : `Bearer ${token}`
        }
    }
};

// search movie from outside api
export const searchMovies = (movieName) => {
    return axios.get(`https://www.omdbapi.com/`,{
                params: {
                    s : movieName,
                    type : "movie",
                    apikey: "6077d8b1",
                }
            })
            .then((res) => {
                return res.data.Search;
            })
            .catch((err) => {
                console.log(err)
            })
}


export const loginUser = (data) => {
    return axios.post("api/users/login", data)
            .then((res) => {
                return res
            })
            .catch(err => {
                return err
            })
}

export const registerUser = (data) => {
    return axios.post("api/users/register", data)
            .then((res) => {
                return res
            })
            .catch(err => {
                return err
            })
}


// logout
export const logoutUser = (accessToken, email) => {
    return axios.post("api/users/logout", {body: {email: email}}, axiosConfig(accessToken))
            .then((res) => {
                return res.status
            })
            .catch((err) => {
                return err
            })
}


// playlist api calls 

// get all playlist data
export const getPlaylists = () => {
    return axios.get("api/playlists/all")
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err
    })
}

// get user playlists
export const getUserPlaylists = (accessToken, userId) => {
    return axios.get(`api/playlists/${userId}`, axiosConfig(accessToken))
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err
    })
}


// create playlist
export const createPlaylist = (accessToken, data) => {
    return axios.post("api/playlists/create", data, axiosConfig(accessToken))
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return err
    })
}


// add movie to playlist
export const addMovieToPlaylist = (accessToken, playlistId, movieData) => {
    return axios.put(`api/playlists/${playlistId}`, movieData, axiosConfig(accessToken))
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    })
}


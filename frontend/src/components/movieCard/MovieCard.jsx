import { Add } from '@mui/icons-material';
import React, {useState} from 'react';
import "./MovieCard.css";
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectPlaylists, savePlaylists, saveMovie } from '../../features/appDataSlice';
import { addMovieToPlaylist, createPlaylist, getUserPlaylists } from '../../utils/apiCalls';

function MovieCard({props}) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const playlists = useSelector(selectPlaylists);

    const [playlistName, setPlaylistName] = useState();
    const [isPrivate, setIsPrivate] = useState(false);

    const cardBackgroundStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.95)), url(${props.Poster})`,
        backgroundSize: "cover",
        height: "100%",
    }

    const addMovie = (e, id) => {
        e.preventDefault();
        const movieData = {
            Title: props.Title,
            Year: props.Year,
            Poster: props.Poster
        };
        addMovieToPlaylist(user.accessToken, id, JSON.stringify(movieData))
            .then((res) => {
                if(res.status === 200){
                    alert("Movie added successfully");
                    dispatch(saveMovie({id, movieData}))
                }
                else {
                    console.log(res);
                }
            })
            .catch(err => {
                console.log(err);
            })
        
    }

    const createAndAddMovie = (e) => {
        e.preventDefault();
        const data = {
            userId: user.user._id,
            name: playlistName,
            movies: [],
            isPrivate: (isPrivate ? true : false)
        }
        createPlaylist(user.accessToken, JSON.stringify(data))
            .then((res) => {
                const p_id = res._id
                getUserPlaylists(user.accessToken, user.user._id)
				.then((res) => {
					dispatch(savePlaylists(res));
                    addMovie(e, p_id);
				})
				.catch(err => {
					console.log(err);
				})
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="card" style={cardBackgroundStyle}>
            <Add className="add__icon" onClick={e => user?.user ? setModalIsOpen(true) : alert("Login to add movie to playlist")} />
            <p> {props.Title} [ {props.Year} ] </p>

            {/* add movie to playlist modal */}
			<Modal 
                className="modal"
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
			>
                <div className="modal__content">
                    <h2>Add movie to playlist</h2>

                    {(playlists?.length > 0) ? 
                        <div className="playlist__list">
                            {playlists?.map(playlist => (
                                <div className="playlist">
                                    <div className="playlist__name">{playlist?.name}</div>
                                    <button className="add__button" onClick={e => {addMovie(e, playlist._id)}}>Add</button>
                                </div>
                            ))}
                        </div> : <></>
                    }
                    
                    <h4>Create Playlist and add movie to it. </h4>
                    <h6>(Check the checkbox to create private playlist)</h6>
                    <div className="playlist">
                        <input className="private__checkbox" type="checkbox" value={isPrivate} onChange={e => setIsPrivate(e.target.value)}/>
                        <input placeholder="Create New Playlist" value={playlistName} onChange={e => setPlaylistName(e.target.value)} />
                        <button className="add__button" onClick={createAndAddMovie}>Create & Add</button>
                    </div>

                    <button className="close__button" onClick={e => setModalIsOpen(false)}>Close </button>
                </div>
			</Modal>
			{/* END */}

        </div>
    )
}

export default MovieCard
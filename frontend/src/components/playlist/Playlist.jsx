import React from 'react';
import "./Playlist.css";
import PlaylistCard from "../playlistCard/PlaylistCard.jsx";

function Playlist({props}) {
    return (
        <div className="playlist">
            <h4>{props.name} playlist</h4>
            <div className="playlist__content">
                {props.movies?.map((movie) => (
                    <PlaylistCard props={movie} />
                ))}
            </div>
        </div>
    )
}

export default Playlist
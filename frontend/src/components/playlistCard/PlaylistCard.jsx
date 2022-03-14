import React from 'react';
import "./PlaylistCard.css";

function PlaylistCard({props}) {

    const cardBackgroundStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.95)), url(${props?.Poster})`,
        backgroundSize: "cover",
        height: "100%",
    }

    return (
        <div className="card" style={cardBackgroundStyle}>
            <p> {props?.Title} [ {props?.Year} ] </p>
        </div>
    )
}

export default PlaylistCard
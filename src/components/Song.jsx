import React from "react";

function Song(props) {

    return (
        <div className="song" draggable="true" id={props.id} onDragStart={props.handleDrag}>
            <h2>{props.title}</h2>
            <p>Artist: {props.artist}</p>    
            <p>Length: {props.duration}</p>
        </div>
    )
}

export default Song;
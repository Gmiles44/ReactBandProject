import React from "react";

function Song(props) {

    return (
        <div className="song" draggable="true" id={props.id} onDragStart={props.handleDrag} onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp}>
            <h2>{props.index}{props.title}</h2>
            <p>Artist: {props.artist}</p>    
            <p>Length: {props.duration}</p>
        </div>
    )
}

export default Song;
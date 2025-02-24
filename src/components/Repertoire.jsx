import React, {useState} from "react";
import Song from "./Song";
import songs from "../assets/songs";
import {fractionToMinSec} from "../assets/functions";

function Repertoire(props) {

    //EDIT - define what can be done with dragged Song components
    function handleDrag(event) {
        event.target.classList.add("dragging")
        event.dataTransfer.effectAllowed="move";
        // console.log(`dragstart: effectAllowed = ${event.dataTransfer.effectAllowed}`);
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    return (
        <div className="repertoire">
            {props.repertoire.map((song, index) => {

                const songLength = fractionToMinSec(song.length)

                return (
                    <Song 
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    artist={song.artist}
                    duration={songLength}
                    handleDrag={handleDrag}
                    />
                )
            })}
        </div>
    )

}

export default Repertoire;
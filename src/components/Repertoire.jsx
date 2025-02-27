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

    function onDrop(event) {
        const id = event.dataTransfer.getData("text/plain")
        const newSong = songs.find(song => song.id === parseInt(id));
        // TEST IF SONG IS IN THE ARRAY ALREADY, BUT IF WE REMOVE IT FROM REPERTOIRE IT'S NOT EVEN NECESSARY
        if (props.repertoire.includes(newSong)) {
            return;
        }
        props.removeSong(newSong, id);
        event.preventDefault();
    }

    function dragEnter(event) {
        event.preventDefault();
        
    }

    function dragOver(event) {
        event.preventDefault();
        
    }

    function handleHover(event) {
        event.target.style.cursor = "grab";
    }
    function handleGrab(event) {
        event.target.style.cursor = "grabbing";
    }

    return (
        <div id="repertoire" className="repertoire" onDrop={onDrop} onDragOver={dragOver} onDragEnter={dragEnter} onMouseOver={handleHover} onMouseDown={handleGrab}>
            <h2 className="heading">Our Repertoire</h2>
            <div className="spacer" id='spacer'></div>
            {props.repertoire.map((song, index) => {

                const songLength = fractionToMinSec(song.length)

                return (
                    <div>
                    <Song 
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    artist={song.artist}
                    duration={songLength}
                    handleDrag={handleDrag}
                    />
                    <div className="spacer" id='spacer'></div>
                    </div>
                )
            })}
        </div>
    )

}

export default Repertoire;
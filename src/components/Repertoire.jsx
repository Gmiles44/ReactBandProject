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
        console.log(event.target);
        if (event.target.includes("<div>")) {
            console.log("isdiv")
        }
        const id = event.dataTransfer.getData("text/plain")
        const newSong = songs.find(song => song.id === parseInt(id));
        // TEST IF SONG IS IN THE ARRAY ALREADY, BUT IF WE REMOVE IT FROM REPERTOIRE IT'S NOT EVEN NECESSARY
        if (props.repertoire.includes(newSong)) {
            console.log("duplicate");
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
        <div className="repertoire" onDrop={onDrop} onDragOver={dragOver} onDragEnter={dragEnter} onMouseOver={handleHover} onMouseDown={handleGrab}>
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
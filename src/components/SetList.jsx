import React, {useState} from "react";
import Song from "./Song";
import songs from "../assets/songs";
import {fractionToMinSec} from "../assets/functions";

function SetList(props) {
    
    //Define drag events, prevent def. for enter/over and define the drop behavior
    function dragEnter(event) {
        event.preventDefault();
        
    }

    function dragOver(event) {
        event.preventDefault();
        
    }

    function onDrop(event) {
        console.log(event.target);
        const id = event.dataTransfer.getData("text/plain")
        const newSong = songs.find(song => song.id === parseInt(id));
        // TEST IF SONG IS IN THE ARRAY ALREADY, BUT IF WE REMOVE IT FROM REPERTOIRE IT'S NOT EVEN NECESSARY
        if (props.list.includes(newSong)) {
            console.log("duplicate");
            return;
        }
        props.onAdd(newSong, id);
        event.preventDefault();
    }

    function handleDrag(event) {
        event.target.classList.add("dragging")
        event.dataTransfer.effectAllowed="move";
        // console.log(`dragstart: effectAllowed = ${event.dataTransfer.effectAllowed}`);
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    function changeOrder(event) {
        console.log(event.target.id)
    }

    return (
        <div id="setlist" onDragEnter={dragEnter} onDragOver={dragOver} onDrop={onDrop}>
            {props.list.map((song, index) => {

                const songLength = fractionToMinSec(song.length)

                return (
                    <div>
                    <div class="spacer" id={index} onDragEnter={dragEnter} onDragOver={dragOver} onDrop={changeOrder}></div>
                    <Song 
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    artist={song.artist}
                    duration={songLength}
                    handleDrag={handleDrag}
                    />
                    <div class="spacer" id={index + 1} onDragEnter={dragEnter} onDragOver={dragOver} onDrop={changeOrder}></div>
                    </div>
                )
            })}
        </div>
    )
}

export default SetList;
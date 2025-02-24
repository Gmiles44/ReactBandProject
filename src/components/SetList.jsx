import React, {useState} from "react";
import Song from "./Song";
import songs from "../assets/songs";
import {fractionToMinSec} from "../assets/functions";

function SetList(props) {
    const [setlist, setSetlist] = useState([])
    
    //Define drag events, prevent def. for enter/over and define the drop behavior
    function dragEnter(event) {
        event.preventDefault();
        
    }
    function dragOver(event) {
        event.preventDefault();
        
    }
    function onDrop(event) {
        const id = event.dataTransfer.getData("text/plain")
        const newSong = songs.find(song => song.id === parseInt(id));
        // TEST IF SONG IS IN THE ARRAY ALREADY, BUT IF WE REMOVE IT FROM REPERTOIRE IT'S NOT EVEN NECESSARY
        // if (setlist.includes(newSong)) {
        //     console.log("duplicate");
        // }
        props.onAdd(newSong, id);
        console.log(newSong);
        event.preventDefault();
    }
    return (
        <div id="setlist" onDragEnter={dragEnter} onDragOver={dragOver} onDrop={onDrop}>
            {props.list.map(song => {

                const songLength = fractionToMinSec(song.length)

                return (
                    <Song 
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    artist={song.artist}
                    duration={songLength}
                    />
                )
            })}
        </div>
    )
}

export default SetList;
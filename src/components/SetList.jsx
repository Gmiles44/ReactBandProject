import React, {useState} from "react";
import Song from "./Song";
import songs from "../assets/songs";
import {fractionToMinSec} from "../assets/functions";
import {animationTest} from '../assets/functions';

function SetList(props) {
    //Define drag events, prevent def. for enter/over and define the drop behavior
    function dragEnter(event) {
        event.preventDefault();
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragExit(event) {
        event.preventDefault();
    }

    function onDrop(event) {
        const id = event.dataTransfer.getData("text/plain")
        const newSong = songs.find(song => song.id === parseInt(id));

        if (event.target.id === 'spacer') {
            if (props.list.includes(newSong)) {
                props.changeOrder(newSong, event.target.attributes.value.value)
            } else {
                props.specificAdd(newSong, event.target.attributes.value.value);
            }
            return;
        }
        if (props.list.includes(newSong)) {
            return;
        }
        props.onAdd(newSong, id);
        animationTest(id);
        event.preventDefault();
    }
    
    function handleDrag(event) {
        event.target.classList.add("dragging")
        event.dataTransfer.effectAllowed="move";
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    return (
        <div id="setlist" className="sortable-list" onDragEnter={dragEnter} onDragOver={dragOver} onDrop={onDrop} onDragExit={dragExit}>
            <h2 className="heading">Your Setlist</h2>
            <div className="spacer" id='spacer' value="0"></div>
            {props.list.map((song, index) => {

                const songLength = fractionToMinSec(song.length)

                return (
                    <div>
                    <div className="spacer" id='spacer' value={index} onDragEnter={dragEnter} onDragOver={dragOver}></div>
                    <Song 
                    key={song.id}
                    id={song.id}
                    index={(index + 1) + ". "}
                    title={song.title}
                    artist={song.artist}
                    duration={songLength}
                    handleDrag={handleDrag}
                    />
                    <div className="spacer" id='spacer' value={index + 1} onDragEnter={dragEnter} onDragOver={dragOver}></div>
                    </div>
                )
            })}
            <h2 className="heading">Set list length:</h2>
        </div>
    )
}

export default SetList;
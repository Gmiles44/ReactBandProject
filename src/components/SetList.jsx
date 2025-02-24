import React, {useState} from "react";
import Song from "./Song";
import songs from "../assets/songs";

function SetList(props) {
    const [setlist, setSetlist] = useState([])
    function dragEnter(event) {
        event.preventDefault();
        
    }
    function dragOver(event) {
        event.preventDefault();
        
    }
    function onDrop(event) {
        //Retrieve index/key/id from dragged object and save it in 'data'
        const data = event.dataTransfer.getData("text/plain")
        const newSong = songs[data];
        setSetlist(prevSetlist => {
            return [...prevSetlist, newSong]
        });
        console.log(setlist);
        event.preventDefault();
    }
    return (
        <div id="setlist" onDragEnter={dragEnter} onDragOver={dragOver} onDrop={onDrop}>
            {setlist.map((song, index) => {
                function pad(num, size) {
                    num = num.toString();
                    while (num.length < size) num = "0" + num;
                    return num;
                }
                const msLength = song.length * 60000
                const mins = parseInt(song.length)
                const rawSecs = Math.round((msLength - (mins * 60000)) / 1000)
                const secs = pad(rawSecs, 2);

                return (
                    <Song 
                    key={index}
                    id={index}
                    title={song.title}
                    artist={song.artist}
                    duration={mins+":"+secs}
                    />
                )
            })}
        </div>
    )
}

export default SetList;
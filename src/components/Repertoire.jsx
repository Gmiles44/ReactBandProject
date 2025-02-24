import React, {useState} from "react";
import Song from "./Song";
import songs from "../assets/songs";


function Repertoire() {
    const [repertoire, setRepertoire] = useState(songs);
    function handleDrag(event) {
        event.target.classList.add("dragging")
        event.dataTransfer.effectAllowed-"move";
        console.log(`dragstart: effectAllowed = ${event.dataTransfer.effectAllowed}`);
        event.dataTransfer.setData("text/plain", event.target.id);
    }
    return (
        <div className="repertoire">
            {repertoire.map((song, index) => {
                function pad(num, size) {
                    num = num.toString();
                    while (num.length < size) num = "0" + num;
                    return num;
                }
                const msLength = song.length * 60000;
                const mins = parseInt(song.length);
                const rawSecs = Math.round((msLength - (mins * 60000)) / 1000);
                const secs = pad(rawSecs, 2)
                
                return (
                    <Song 
                    key={index}
                    id={index}
                    title={song.title}
                    artist={song.artist}
                    duration={mins+":"+secs}
                    handleDrag={handleDrag}
                    />
                )
            })}
        </div>
    )

}

export default Repertoire;
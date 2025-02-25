import React, {useState} from "react";
import songs from "../assets/songs";
import Repertoire from "./Repertoire";
import SetList from "./SetList";
import Header from "./Header";
import Footer from "./Footer";

function App() {

  //Initialize the states for both the repertoire and the setlist.
  //Setlist begins as a blank array and repertoire contains all known songs
  const [repertoire, setRepertoire] = useState(songs);
  const [setlist, setSetlist] = useState([])

  function addSong(newSong, songId) {
    setSetlist(prevSetlist => {
      return [...prevSetlist, newSong]
    });
    setRepertoire(repertoire.filter(song => song.id !== parseInt(songId)));
  }
  
  function removeSong(newSong, songId) {
    setRepertoire(prevRepertoire => {
      return [...prevRepertoire, newSong]
    });
    setSetlist(setlist.filter(song => song.id !== parseInt(songId)));
  }

  return (
    <div>
      <Header />
      <Repertoire removeSong={removeSong} repertoire={repertoire}/>
      <SetList onAdd={addSong} list={setlist}/>
      <Footer />
    </div>
  )
}

export default App;

import React, {useState} from "react";
import songs from "../assets/songs";
import Repertoire from "./Repertoire";
import SetList from "./SetList";
import Header from "./Header";
import Footer from "./Footer";

function App() {

  const [repertoire, setRepertoire] = useState(songs);
  const [setlist, setSetlist] = useState([])

  function addSong(newSong, songId) {
    setSetlist(prevSetlist => {
      return [...prevSetlist, newSong]
    });
    setRepertoire(repertoire.filter(song => song.id !== parseInt(songId)));
  }
  
  return (
    <div>
      <Header />
      <Repertoire repertoire={repertoire}/>
      <SetList onAdd={addSong} list={setlist}/>
      <Footer />
    </div>
  )
}

export default App;

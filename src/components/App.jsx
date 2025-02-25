import React, {useState} from "react";
import songs from "../assets/songs";
import Repertoire from "./Repertoire";
import SetList from "./SetList";
import Header from "./Header";
import Footer from "./Footer";
import {array_move} from "../assets/functions";

function App() {

  //Initialize the states for both the repertoire and the setlist.
  //Setlist begins as a blank array and repertoire contains all known songs
  const [repertoire, setRepertoire] = useState(songs);
  const [setlist, setSetlist] = useState([])

  function addSong(newSong, songId) {
    console.log('add song');
    setSetlist(prevSetlist => {
      return [...prevSetlist, newSong]
    });
    setRepertoire(repertoire.filter(song => song.id !== parseInt(songId)));
  }
  
  function removeSong(newSong, songId) {
    console.log('remove song');
    setRepertoire(prevRepertoire => {
      return [...prevRepertoire, newSong]
    });
    setSetlist(setlist.filter(song => song.id !== parseInt(songId)));
  }

  function changeOrder(newSong, index) {
    console.log('change order');
    setSetlist(prevSetlist => {
      return setlist.filter(song => song.id !== parseInt(newSong.id));
    });
    setSetlist(prevSetlist => {
      return prevSetlist.toSpliced(index, 0, newSong);
    });
  }

  function specificAdd(newSong, index) {
    console.log('specific add');
    console.log(newSong, index);
    setSetlist(prevSetlist => {
      console.log(prevSetlist);
      return prevSetlist.toSpliced(index, 0, newSong);
    });
    setRepertoire(repertoire.filter(song => song.id !== parseInt(newSong.id)));
  }

  return (
    <div>
      <Header />
      <Repertoire removeSong={removeSong} repertoire={repertoire}/>
      <SetList onAdd={addSong} changeOrder={changeOrder} specificAdd={specificAdd} list={setlist}/>
      <Footer />
    </div>
  )
}

export default App;

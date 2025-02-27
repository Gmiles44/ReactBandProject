import React, {useState} from "react";
import songs from "../assets/songs";
import Repertoire from "./Repertoire";
import SetList from "./SetList";
import Header from "./Header";
import Footer from "./Footer";
import {animationTest} from '../assets/functions';

function App() {

  //Initialize the states for both the repertoire and the setlist.
  //Setlist begins as a blank array and repertoire contains all known songs
  const [repertoire, setRepertoire] = useState(songs);
  const [setlist, setSetlist] = useState([])

  function addSong(newSong, songId) {
    if (!newSong || !songId) {
      alert('Be sure to drag a single song at a time!');
      return;
    }
    setSetlist(prevSetlist => {
      return [...prevSetlist, newSong]
    });
    setRepertoire(repertoire.filter(song => song.id !== parseInt(songId)));
  }
  
  function removeSong(newSong, songId) {
    if (!newSong || !songId) {
      alert('Be sure to drag a single song at a time!');
      return;
    }
    setRepertoire(prevRepertoire => {
      return [...prevRepertoire, newSong]
    });
    setSetlist(setlist.filter(song => song.id !== parseInt(songId)));
  }

  function changeOrder(newSong, index) {
    const songIndex = setlist.findIndex(song => song.id === parseInt(newSong.id));
    setSetlist(prevSetlist => {
      return setlist.filter(song => song.id !== parseInt(newSong.id));
    });
    setSetlist(prevSetlist => {
      if (songIndex >= parseInt(index)) {
        return prevSetlist.toSpliced(index, 0, newSong);
      } else {
        return prevSetlist.toSpliced(index - 1, 0, newSong);
      }
    });
  }

  function specificAdd(newSong, index) {
    setSetlist(prevSetlist => {
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

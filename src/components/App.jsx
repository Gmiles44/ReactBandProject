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
    //Prevent running if the item dragged over is not a single song element
    if (!newSong || !songId) {
      alert('Be sure to drag a single song at a time!');
      return;
    }
    //Update setlist with the previous value plus the new song
    setSetlist(prevSetlist => {
      return [...prevSetlist, newSong]
    });
    //Remove song added to setlist from repertoire
    setRepertoire(repertoire.filter(song => song.id !== parseInt(songId)));
    //Appearance animation - had to use a setTimeout to get it to work (for now)
    setTimeout(() => {
      const element = document.getElementById(songId);
      console.log(element);
      element.classList.add("appear");
    }, 0);
  }
  
  function removeSong(newSong, songId) {
    //If not a single song element, abort and return error message
    if (!newSong || !songId) {
      alert('Be sure to drag a single song at a time!');
      return;
    }
    //Put song back into repertoire
    setRepertoire(prevRepertoire => {
      return [...prevRepertoire, newSong]
    });
    //Remove song from setlist
    setSetlist(setlist.filter(song => song.id !== parseInt(songId)));
    //Another patch-fix setTimeout
    setTimeout(() => {
      const element = document.getElementById(songId);
      console.log(element);
      element.classList.add("appear");
    }, 0);
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
    setTimeout(() => {
      const element = document.getElementById(newSong.id);
      console.log(element);
      element.classList.add("translate");
    }, 10);
  }

  function specificAdd(newSong, index) {
    setSetlist(prevSetlist => {
      return prevSetlist.toSpliced(index, 0, newSong);
    });
    setRepertoire(repertoire.filter(song => song.id !== parseInt(newSong.id)));
    setTimeout(() => {
      const element = document.getElementById(newSong.id);
      console.log(element);
      element.classList.add("appear");
    }, 0);
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

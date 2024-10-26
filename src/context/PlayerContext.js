import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [login, setlogin] = useState("Login");
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [checkdau, setcheckdau] = useState(false);

  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    // alert("mang tinh la:"+songsData[id])
    await setTrack(songsData[id - 1]);
    await setTimeout(() => {
      audioRef.current.play();
    }, 500);
    setcheckdau(true)

    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      let a = Number(track.id) - 1;

      await setTrack(songsData[a]);
      // alert('bai hat truoc co id:'+songsData[track.id]+" "+a)

      await setTimeout(() => {
        audioRef.current.play();
      }, 500);
      setPlayStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      console.log(track.id);
      let b = Number(track.id) + 1;

      await setTrack(songsData[b]);
      // alert('bai hat tiep theo co id:'+songsData[track.id]+" "+b)

      await setTimeout(() => {
        audioRef.current.play();
      }, 500);
      setPlayStatus(true);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    login,
    setlogin,
    checkdau,
    searchActive,
    setSearchActive,
    searchResults,
    setSearchResults,
    searchTerm,
    setSearchTerm,
  };
  // useEffect(()=>{

  // },[searchTerm])

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

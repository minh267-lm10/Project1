import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [checkdau, setcheckdau] = useState(false);
  const[datauser,setDatauser]=useState([]);
  const [index,setIndex]=useState()
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
    await setTrack(songsData[id]);
    setIndex(id)
    await setTimeout(() => {
      audioRef.current.play();
    }, 500);
    setcheckdau(true)

    setPlayStatus(true);
  };

  const previous = async () => {
      setIndex((prevIndex) => {
        if (prevIndex > 0) { 
          const newIndex = prevIndex -1;
          setTrack(songsData[newIndex]); 
          return newIndex; 
        }
        return prevIndex; 
      });

      await setTimeout(() => {
        audioRef.current.play();
      }, 500);
      setPlayStatus(true);
    
  };

  const next = async () => {
    setIndex((prevIndex) => {
      if (prevIndex < songsData.length -1) { 
        const newIndex = prevIndex + 1;
        setTrack(songsData[newIndex]); 
        return newIndex; 
      }
      return prevIndex; 
    });
  
    await setTimeout(() => {
      audioRef.current.play();
    }, 500);
    setPlayStatus(true);
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
    checkdau,
    searchActive,
    setSearchActive,
    searchResults,
    setSearchResults,
    searchTerm,
    setSearchTerm,
    datauser,
    setDatauser
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

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
  const [searchResults, setSearchResults] = useState();
  const [searchResultsinger, setSearchResultsinger] = useState();
  const[check,setCheck]=useState(false);
  //phan nhac cg
  const [volume, setVolume] = useState(1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false); // Trạng thái để kiểm tra chế độ loop




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

  const toggleLoop = () => {
    setIsLoop(!isLoop);
};
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

//   if (isShuffle) {
//     const randomIndex = Math.floor(Math.random() * 8) + 1;
//     await setTrack(songsData[randomIndex]);
// } else if (track.id < songsData.length - 1) {
//     await setTrack(songsData[track.id + 1]);
// }

  const next = async () => {
    if(isShuffle){
      const randomIndex =Math.floor(Math.random()*songsData.length);
      await setTrack(songsData[randomIndex])
    }else
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
     // Hàm bật/tắt shuffle
     const toggleShuffle = () => {
      setIsShuffle(!isShuffle);
  };
  

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  useEffect(() => {
    // Kiểm tra nếu audioRef và seekBar còn tồn tại
    if (audioRef.current && seekBar.current) {
      // Đảm bảo gọi lại sự kiện play khi quay lại trang
      const onTimeUpdate = () => {
        // Kiểm tra nếu audioRef.current không phải null
        if (audioRef.current) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration;
  
          if (seekBar.current) {
            seekBar.current.style.width =
              Math.floor((currentTime / duration) * 100) + "%";
          }
  
          setTime({
            currentTime: {
              second: Math.floor(currentTime % 60),
              minute: Math.floor(currentTime / 60),
            },
            totalTime: {
              second: Math.floor(duration % 60),
              minute: Math.floor(duration / 60),
            },
          });
        }
      };
  
      // Gán sự kiện ontimeupdate cho audioRef.current
      audioRef.current.ontimeupdate = onTimeUpdate;
  
      // Nếu audioRef không phát nhạc, thử phát nhạc lại
      if (audioRef.current.paused && playStatus) {
        audioRef.current.play();
      }
  
      // Cleanup function để loại bỏ sự kiện khi component bị hủy
      return () => {
        if (audioRef.current) {
          audioRef.current.ontimeupdate = null; // Xóa sự kiện khi component bị hủy
        }
      };
    }
  }, [audioRef, seekBar, playStatus]); // useEffect sẽ chạy lại khi audioRef hoặc seekBar thay đổi
  
  
  
  const adjustVolume = (e) => {
    const volumeBarWidth = e.currentTarget.offsetWidth;
    const offsetX = e.nativeEvent.offsetX;
    const newVolume = offsetX / volumeBarWidth; // Tính toán giá trị âm lượng
    setVolume(newVolume); // Cập nhật giá trị âm lượng

    // Cập nhật âm lượng của audioRef
    if (audioRef.current) {
        audioRef.current.volume = newVolume;
    }
};


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
    setDatauser,
    searchResultsinger,setSearchResultsinger,
    volume, setVolume, // Thêm volume và setVolume vào context
    adjustVolume,
    isShuffle, toggleShuffle,
    check,setCheck,
    isLoop, // Trạng thái loop
    toggleLoop // H
    
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

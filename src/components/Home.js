import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import Player from "./Player";
import Display from "./Display";
import { PlayerContext } from "../context/PlayerContext";

function Home(props) {
    const { audioRef, track ,next, isLoop} = useContext(PlayerContext);
    const [audioUrl, setAudioUrl] = useState(null);

    useEffect(() => {
        const fetchAudio = async () => {  
            try {
                const response = await fetch(track.file);
                if (!response.ok) {
                    throw new Error("Failed to fetch audio");
                }

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                console.log("Audio URL:", url); // Ghi log URL

                setAudioUrl(url);
            } catch (error) {
                console.error("Error fetching audio:", error);
            }
        };

        if (track.file) {
            fetchAudio();
        }

        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [track]);

    return (
        <div className="h-screen bg-black">
            <div className="h-[90%] flex">
                <SideBar />
                <Display />
            </div>
            <div>
                <Player />         
                    <audio ref={audioRef} src={audioUrl} preload="auto" onEnded={() => {
                        if (isLoop) {
                            audioRef.current.currentTime = 0; // Quay lại đầu bài hát
                            audioRef.current.play(); // Phát lại
                        } else {
                            next(); // Chuyển bài nếu không có loop
                        }
                    }}/>     
            </div>
        </div>
    );
}

export default Home;

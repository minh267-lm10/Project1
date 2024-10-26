import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import Player from "./Player";
import Display from "./Display";
import { PlayerContext } from "../context/PlayerContext";

function Home(props) {
    const { audioRef, track } = useContext(PlayerContext);
    const [audioUrl, setAudioUrl] = useState(null);

    useEffect(() => {
        const fetchAudio = async () => {  
            try {
                const response = await fetch(`http://localhost:8888/api/v1/music${track.file}`);
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
                    <audio ref={audioRef} src={audioUrl} preload="auto" />     
            </div>
        </div>
    );
}

export default Home;

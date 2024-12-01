import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { albumsData,img1 } from "../assets/assets";
// import infoaccount from "./account/Infoaccount";
import Infaccount from "./account/Infaccount";
import Search from "./search/Search";
import Infaccountsinger from "./account/Infaccountsinger";
import Postartist from "./postbyartist/Postartist";
import { PlayerContext } from "../context/PlayerContext";
import AddPlaylist from "./AddPlaylist";

const Display = () => {
    const{check}=useContext(PlayerContext)
    const displayRef = useRef();
    const location = useLocation();
    //console.log(location);
    const isAlbum = location.pathname.includes("album")
    //console.log(isAlbum);
    const albumId = isAlbum ? location.pathname.slice(-1) : "";
    console.log(albumId);
    const bgColor = albumsData[Number(1)].bgColor;
    //console.log(bgColor);

    useEffect(() => {
        if (isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
        }
        else {
            displayRef.current.style.background = `#121212`
        }
    })

    return (
        <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            
            <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/album/:id" element={<DisplayAlbum />} />
                <Route path="/infoaccount" element={<Infaccount />} />
                <Route path="/infoaccountsinger/:userId" element={<Infaccountsinger />} />
                <Route path="/search" element={<Search check={check} />} />
                <Route path="/post" element={<Postartist />} />
                <Route path="/addplaylist" element={<AddPlaylist />} />


            </Routes>
        </div>
    )

}
export default Display
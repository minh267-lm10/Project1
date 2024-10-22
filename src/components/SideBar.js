import React, { useState,useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { songsDataca4 } from "../assets/assets";
import { albumsDataca4 } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext"
// id: 3,
// name: "Song Four",
// image: img4,
// file: song1,
// desc: "Put a smile on your face with these happy tunes",
// duration: "2:50"
const SideBar = () => {
    const {searchActive, setSearchActive} = useContext(PlayerContext);
    const {searchTerm, setSearchTerm} = useContext(PlayerContext);
    const {searchResults, setSearchResults} = useContext(PlayerContext);
  const navigate = useNavigate();
 


  const checkSearch = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm.length > 0) {
      const results = songsDataca4.filter(
        (song) =>
          song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else setSearchResults([]);
  };
  const checkactive = () => {
    if(searchActive==false)
    {
        setSearchActive(!searchActive);
        setSearchTerm("");
        navigate('/search')
    }
    else{
        setSearchActive(!searchActive);
        navigate('/')

    }

  };

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        {/* Home */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <img className="w-6" src={assets.home_icon} alt="home" />
          <p className="font-bold">Home</p>
        </div>

        {/* Search */}
        <div
          onClick={checkactive}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <img className="w-6" src={assets.search_icon} alt="search" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      {/* Hiển thị SearchBar nếu searchActive là true */}
      {searchActive && (
        <>
          <div className="bg-[#242424] p-4 m-2 rounded">
            <input
              type="text"
              className="w-full p-2 rounded bg-[#242424] text-white outline-none"
              placeholder="Search for songs, albums, or artists..."
              onChange={(e) => {
                checkSearch(e);
              }}
              
            />
          </div>
     
        </>
      )}

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="library" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="arrow" />
            <img className="w-5" src={assets.plus_icon} alt="add" />
          </div>
        </div>

        {/* Các mục khác */}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create first playlist</h1>
          <p className="font-light">It's easy we will help you</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Create Playlist
          </button>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We'll keep you update on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

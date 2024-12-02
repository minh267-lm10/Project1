import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import NavBar from './NavBar';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';
import Apisong from '../Api/Apisong';
import Apiplaylist from '../Api/Apiplaylist';

const AddPlaylist = () => {
    const [playlistName, setPlaylistName] = useState("My Playlist");
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [addedSongs, setAddedSongs] = useState([]);  // State để lưu bài hát đã thêm
    const [isSearching, setIsSearching] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // State hiển thị thông báo


    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response= await Apisong.apigetallsong(1,15);
                setSongs(response.data.result.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
        
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = songs.filter(song =>
                song.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs([]);
        }
    }, [searchTerm, songs]);

 

    const handleNameChange = (event) => {
        if (event.key === 'Enter' || event.type === 'blur') {
            setIsEditing(false);
        }
    };

    const handleAddSong = (song) => {
        const songExists = addedSongs.some(addedSong => addedSong.id === song.id);
        if (!songExists) {
            setAddedSongs((prevSongs) => [...prevSongs, song]);
            setSearchTerm("")  
            
        } else {
            
        }
    };

    const handleCreatePlaylist = async () => {
        const playlistData = {
            name: playlistName,
            desc: `Collection of ${playlistName}`,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFkbvS5hOclbltXVzheWMVot9nZihE7F8gaw&s",
            songIds: addedSongs.map(song => song.id),  // Lấy ID của các bài hát đã thêm
        };

        try {
            
            const response =await Apiplaylist.apicreateplaylist(playlistData)
            setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); 
      }, 3000);
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    return (
        <>
            <NavBar />
            {showAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#434750] text-white px-4 py-2 rounded-md shadow-lg">
            Đã đăng bài thành công!
          </div>
        )}
            <div className="bg-[#121212] text-white min-h-screen p-8">
                <div className="flex items-center gap-6">
                    <div className="w-48 h-48 bg-[#242424] flex items-center justify-center rounded-md cursor-pointer relative overflow-hidden">
                        
                       <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFkbvS5hOclbltXVzheWMVot9nZihE7F8gaw&s'
                                alt="User"
                                    className='w-48 w-48'
                                /> 
                    </div>

                    <div>
                    <h4 className="my-5 font-bold text-2xl">Playlist</h4>
                    {isEditing ? (
                            <input
                                type="text"
                                value={playlistName}
                                onChange={(e) => setPlaylistName(e.target.value)}
                                onKeyDown={handleNameChange}
                                onBlur={handleNameChange}
                                autoFocus
                                className="text-6xl font-bold bg-transparent outline-none border-none text-white"
                            />
                        ) : (
                            <h1
                                className="text-6xl font-bold cursor-pointer"
                                onClick={() => setIsEditing(true)}
                            >
                                {playlistName}
                            </h1>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                            
                        <h4 className="my-1 font-bold text-2xl">Tạo theo cách bạn muốn </h4>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-xl font-bold mb-2">Songs added to your playlist</p>
                    <div>
                <div className="mt-6 flex justify-between items-center border-b border-gray-700 pb-4">
                    <div className="flex gap-2 items-center">
                        <div className="w-8 h-8 bg-[#242424] rounded-full flex items-center justify-center cursor-pointer">
                            <span className="text-xl text-gray-400">•••</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="text-sm text-gray-600">Danh sách</p>
                    </div>
                </div>
                  {/* Hiển thị các bài hát đã thêm vào playlist */}
                 
                        {addedSongs.map((song) => (
                            <div
                                key={song.id}
                                className="flex items-center justify-between p-4 bg-[#242424] rounded-lg mb-2"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={song.image}
                                        alt={song.name}
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                    <div>
                                        <p className="text-white font-semibold">{song.name}</p>
                                        <p className="text-gray-400 text-sm">{song.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Phần tìm kiếm */}
                <div className="mt-6">
                    <p className="text-xl font-bold mb-2">Let's find something for your playlist</p>
                    <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for songs or episodes"
                                className="w-full p-4 pl-10 bg-[#242424] text-gray-300 rounded-full focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearching(true)}
                                onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                            />
                        <span
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                            onClick={() => setSearchTerm('')}
                        >
                            <i className="material-icons">close</i>
                        </span>
                    </div>
                </div>

                {/* Hiển thị kết quả tìm kiếm chỉ khi isSearching là true */}
                {isSearching && filteredSongs.length > 0 && (
                    <div className="mt-4">
                        {filteredSongs.map((song) => (
                            <div
                                key={song.id}
                                className="flex items-center justify-between p-4 bg-[#242424] rounded-lg mb-2"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={song.image}
                                        alt={song.name}
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                    <div>
                                        <p className="text-white font-semibold">{song.name}</p>
                                        <p className="text-gray-400 text-sm">{song.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-gray-400 text-sm">{song.name}</p>
                                    <button
                                        className="bg-[#2a2828] text-white rounded-full px-4 py-1 text-sm"
                                        onClick={() => handleAddSong(song)} // Kiểm tra và thêm bài hát vào danh sách nếu chưa có
                                    >
                                        {addedSongs.some(addedSong => addedSong.id === song.id) ? "Added" : "Add"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

              

                {/* Nút tạo playlist */}
                <button
                    onClick={handleCreatePlaylist}
                    className="mt-6 bg-[#242424] text-white py-2 px-6 rounded-full"
                >
                    Create Playlist
                </button>
            </div>
        </>
    );
};

export default AddPlaylist;

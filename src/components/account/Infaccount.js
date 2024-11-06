import React, { useEffect, useState,useContext } from 'react';
import NavBar from "../NavBar";
import { albumsDataca4 } from "../../assets/assets";
import { songsDataca4 } from "../../assets/assets";
// import {initializeSongsData} from"../assets/assets";
import Albumitem from "../Albumitem";
import Songitem from "../Songitem";
import axios from 'axios';
import { PlayerContext } from '../../context/PlayerContext';
import Apiplaylist from '../../Api/Apiplaylist';
import { initializeAlbumdata } from '../../assets/assets';
function Infaccount(props) {
    const [song,setSong]=useState([])
    const {datauser,setDatauser}=useContext(PlayerContext);
    const [dataplaylist,setDataplaylist]=useState([]);

    const fetchDataplaylistuser= async () => {
      try {
        const response = await Apiplaylist.apigetallplaylistuser(1,6);
        setDataplaylist(response.data.result.data);
        console.log("hhhhhhh",response)
      } catch (err) {
        alert("Ma loi la: "+err.response.data.code +" Message: "+err.response.data.message)
      }
    };

    useEffect(() => {     
          fetchDataplaylistuser()
  }, []);
    useEffect(() => {
    
     initializeAlbumdata(dataplaylist)
        
}, [dataplaylist]);


  return (
    <>
      <NavBar />
      <div className="mt-10 flex flex-col md:flex-row items-center bg-[#242424] p-8 rounded-lg text-white">
        
      <div className="bg-black text-gray-400 text-9xl w-48 h-48 rounded-full flex items-center justify-center cursor-pointer">
  {datauser?.img ? (
    <img
       src={`http://localhost:8888/api/v1/music${datauser.img}`}
      alt="Profile"
      onError={(e) => {
          e.target.onerror = null; // Ngăn không cho vòng lặp vô hạn
          e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFkbvS5hOclbltXVzheWMVot9nZihE7F8gaw&s'; // Hình ảnh mặc định
        }}
      className="w-48 h-48 rounded-full object-cover"
    />
  ) : (
    <p>{datauser?.username ? datauser.username.charAt(0).toUpperCase() : "A "}</p>
  )}
</div>
        

        {/* Thông tin hồ sơ */}
        <div className="flex flex-col items-start ml-8">
          <h4 className="text-lg mb-2">Profile</h4>
          {console.log("datauser:",datauser)}
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{datauser.username? (datauser?.lastName+" " +datauser?.firstName):'Admin'}</h2>
          <h4 className="text-lg mb-2">Thỏa thích sáng tạo</h4>
          <p className="mt-1 text-gray-300">
            <b>2 Playlist công khai</b> <span className="mx-2">•</span>
            <b>50 bài hát</b>
          </p>
        </div>
      </div>

      <div className="mb-4 ">
                <h1 className="my-5 font-bold text-2xl">Playlist đã tạo</h1>
                <div className="flex overflow-x-auto ">
                    {dataplaylist.map((item, index) => (<Albumitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}  className="w-48 h-48 object-cover" />))}

                </div>
            </div>
      <div className="mb-4 ">
                <h1 className="my-5 font-bold text-2xl">Bài hát đã thích</h1>
                <div className="flex overflow-auto">
                    {/* {songsData.map((item, index) => (<Songitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))} */}
                    {songsDataca4.map((item, index) => (<Songitem key={index} name={item.Name} desc={item.Description} id={item.id} image={item.Images} />
                    ))}

                </div>
            </div>
    </>
    
  );
}

export default Infaccount;

import React, { useEffect, useState,useContext } from 'react';
import NavBar from "../NavBar";
import { albumsDataca4 } from "../../assets/assets";
import { songsDataca4 } from "../../assets/assets";
// import {initializeSongsData} from"../assets/assets";
import Albumitem from "../Albumitem";
import Songitem from "../Songitem";
import axios from 'axios';
import { PlayerContext } from '../../context/PlayerContext';
function Infaccount(props) {
    const [song,setSong]=useState([])
    const {datauser,setDatauser}=useContext(PlayerContext);

    useEffect(() => {
   let res= async()=>{
      let respon = await axios.get('https://6707fad88e86a8d9e42dae05.mockapi.io/api/nhac/getAllsongs')
      console.log(respon.data)
      setSong(respon.data);
        // initializeSongsData(respon.data)
    //   console.log("mang tinh la:",songsData)
      
   }
   res()
 
 }, []);
  return (
    <>
      <NavBar />
      <div className="mt-10 flex flex-col md:flex-row items-center bg-[#242424] p-8 rounded-lg text-white">
        {/* Hình ảnh đại diện */}
        <img
          className="w-48 rounded-full border-4 border-gray-700"
          src="https://vcdn1-dulich.vnecdn.net/2021/07/16/3-1-1626444927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=KU8IkmrM5HbtYIyyS5k1qQ"
          alt="Profile"
        />
        
        {/* Thông tin hồ sơ */}
        <div className="flex flex-col items-start ml-8">
          <h4 className="text-lg mb-2">Profile</h4>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{datauser.firstName}</h2>
          <h4 className="text-lg mb-2">Thỏa thích sáng tạo</h4>
          <p className="mt-1 text-gray-300">
            <b>2 Playlist công khai</b> <span className="mx-2">•</span>
            <b>50 bài hát</b>
          </p>
        </div>
      </div>
      <div className="mb-4 ">
                <h1 className="my-5 font-bold text-2xl">Playlist đã lưu</h1>
                <div className="flex overflow-x-auto ">
                    {albumsDataca4.map((item, index) => (<Albumitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}  className="w-48 h-48 object-cover" />))}

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

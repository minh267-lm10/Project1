import React, { useEffect, useState,useContext } from 'react';
import NavBar from "../NavBar";
import { albumsDataca4, initializeSongsData, songsData } from "../../assets/assets";
import { songsDataca4 } from "../../assets/assets";
// import {initializeSongsData} from"../assets/assets";
import Albumitem from "../Albumitem";
import Songitem from "../Songitem";
import axios from 'axios';
import { PlayerContext } from '../../context/PlayerContext';
import Apiplaylist from '../../Api/Apiplaylist';
import { initializeAlbumdata } from '../../assets/assets';
import Postartist from '../postbyartist/Postartist';
import AccountPost from '../postbyartist/AccountPost';
import Apisinger from '../../Api/Apisinger';
function Infaccount(props) {
    const [song,setSong]=useState([])
    const {datauser,setDatauser}=useContext(PlayerContext);
    const [dataplaylist,setDataplaylist]=useState([]);
    const [datasong,setDatasong]=useState([])
    const callbacksong=()=>{
      initializeSongsData(datasong)   
    }
    const fetchDataplaylistuser= async () => {
      try {
        const response = await Apiplaylist.apigetallplaylistuser(1,9);
        if(datauser.stageName)
        {
          const response1= await Apisinger.apigetsongsinger(datauser.userId);
          setDatasong(response1.data.result)
          console.log(response1.data.result)
        }
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
       src={datauser.img}
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
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
             {datauser?.username
               ? `${datauser.lastName || ""} ${datauser.firstName || ""}`.trim()
               : "Admin"}</h2>          
            <h4 className="text-lg mb-2">Thỏa thích sáng tạo, không tiếc thanh xuân</h4>
          <p className="mt-1 text-gray-300">
            <b>{dataplaylist.length} playlist đã tạo</b> <span className="mx-2">•</span>
            <b>{datasong.length} bài hát công khai</b>
          </p>
        </div>
      </div>

      <div className="mb-4 ">
                <h1 className="my-5 font-bold text-2xl">Playlist đã tạo</h1>
                <div className="flex overflow-x-auto whitespace-nowrap gap-4 ">
                    {dataplaylist.map((item, index) => (
                      <div key={index} className="flex-none w-48">
                      <Albumitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}  />

                      </div>
                      ))}

                </div>
            </div>
      {datauser.stageName &&(<>
        <div className="mb-4 ">
                <h1 className="my-5 font-bold text-2xl">Bài hát của bạn</h1>
                <div className="flex overflow-x-auto whitespace-nowrap gap-4">
                    {/* {songsData.map((item, index) => (<Songitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))} */}
                   
                    {datasong.map((item, index) => ( 
                      <div key={index} className="flex-none w-48">
                      <Songitem index={index} name={item.name} desc={item.desc}id={item.id}image={item.image}callbacksong={callbacksong}  />

                       </div>

                      
                    ))}

                </div>
            </div>
      </>)}
      <h1 className="my-5 font-bold text-2xl">Bài viết của bạn</h1>
      <AccountPost/>
    </>
    
  );
}

export default Infaccount;

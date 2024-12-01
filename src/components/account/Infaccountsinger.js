import React, { useEffect, useState,useContext } from 'react';
import NavBar from '../NavBar';
import Songitem from '../Songitem';
import { useParams } from "react-router-dom";
import Apiuser from '../../Api/Apiuser';
import Apisinger from '../../Api/Apisinger';
import { initializeSongsData } from '../../assets/assets';
import { getToken } from '../../Service/Localtokenservice';
import { useNavigate } from "react-router-dom";

function Infaccountsinger(props) {
    const [checkfl,setcheckfl]=useState("")
    const { userId} = useParams();
    const [datasinger,setDatasinger]=useState([])
    const [songdata,setSongdata]=useState([])
    let navigate = useNavigate();


    const callbacksong=()=>{
      initializeSongsData(songdata)   
    }
    let fetchapisinger=async()=>{
        try {
          let response1= await Apisinger.apigetsongsinger(userId)
          let response2= await Apisinger.apigetprofilesinger(userId)
          setDatasinger(response2.data.result)
          setSongdata(response1.data.result)
          
        } catch (error) {
          alert("lỗi ở in4singer")
        }
    }
    useEffect(()=>{
      fetchapisinger()
      
    },[checkfl])

    useEffect(()=>{
      if(!datasinger.isFollowing||datasinger.isFollowing===false)
        setcheckfl("Follow")
      else
        setcheckfl("Đã follow")
      },[datasinger])

    let sendfollow=async()=>{
      if(getToken())
        try {
          let res = await Apiuser.apifollow(userId)
          let check=res.data.result
          if(check==true)
            setcheckfl("Đã follow")
          else
            setcheckfl("Follow")
        
        } catch (error) {
          alert("loi roi:"+error.response.data)
          
        }
      else
        navigate('/login')
        
    }
    
    return (
        <>
        <NavBar />
        <div className="mt-10 flex flex-col md:flex-row items-center bg-[#242424] p-8 rounded-lg text-white">
          
        <div className="bg-black text-gray-400 text-9xl w-48 h-48 rounded-full flex items-center justify-center cursor-pointer">
    {datasinger?.img ? (
      <img
         src={datasinger.img}
        alt="Profile"
        
        className="w-48 h-48 rounded-full object-cover"
      />
    ) : (
      <p>{datasinger?.username ? datasinger.username.charAt(0).toUpperCase() : " "}</p>
    )}
  </div>
          
  
          {/* Thông tin hồ sơ */}
          <div className="flex flex-col items-start ml-8">
            <h4 className="text-lg mb-2">Trang của nghệ sĩ</h4>
            <h2 className="text-5xl font-bold mb-4 md:text-7xl">{(datasinger?.stageName)|| 'Admin'}</h2>
            <h4 className="text-lg mb-2">Thỏa thích sáng tạo</h4>
            <p className="mt-1 text-gray-300">
              <b className="text-lg mb-2">Số lượng follow: {datasinger.numberOfFollowers}</b> <span className="mx-2"></span>
              <button
              className="px-4 py-1.5 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition duration-200"
              onClick={() => {sendfollow()}}
              >
            {checkfl}
              </button>
            </p>  
          </div>
        </div>
  
        <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Bài hát của nghệ sĩ</h1>
        <div className="flex overflow-x-auto whitespace-nowrap gap-4">
          {songdata.map((item, index) => (
            <div key={index} className="flex-none w-48">
              {" "}
              {/* Đặt kích thước cố định cho từng phần tử */}
              <Songitem
               index={index}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
                 callbacksong={callbacksong}
              />
            </div>
          ))}
        </div>
      </div>
      </>
    );
}

export default Infaccountsinger;
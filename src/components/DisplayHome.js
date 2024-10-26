import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import { albumsData } from "../assets/assets";
import { songsData } from "../assets/assets";
import {initializeSongsData} from"../assets/assets";
import Albumitem from "./Albumitem";
import Songitem from "./Songitem";
import axios from 'axios';
import Apiuser from "../Api/Apiuser";
import Apisong from "../Api/Apisong"

const DisplayHome = () => {
    const [song,setSong]=useState([])
     useEffect(() => {
    let res= async()=>{
    let respon = (await Apisong.apigetallsong()).data;
    console.log(respon)
       setSong(respon.result);
       initializeSongsData(respon.result)
      console.log("mang tinh la:",songsData)
    
       
    }
    res()
  
  }, []);
    return (
        <>
            <NavBar />
            <div className="mb-4 ">
                <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                <div className="flex overflow-auto">
                    {albumsData.map((item, index) => (<Albumitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}

                </div>
            </div>
            <div className="mb-4 ">
                <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
                <div className="flex overflow-auto">
                    {/* {songsData.map((item, index) => (<Songitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))} */}
                    {song.map((item, index) => (<Songitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
                    ))}
                </div>
            </div>
            
            
        </>
    )
}
export default DisplayHome





import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import { albumsData } from "../assets/assets";
import { songsData } from "../assets/assets";
import {initializeSongsData} from"../assets/assets";
import Albumitem from "./Albumitem";
import Songitem from "./Songitem";
import axios from 'axios';
const DisplayHome = () => {
    const [song,setSong]=useState([])
     useEffect(() => {
    let res= async()=>{
       let respon = await axios.get('https://6707fad88e86a8d9e42dae05.mockapi.io/api/nhac/getAllsongs')
       console.log(respon.data)
       setSong(respon.data);
         initializeSongsData(respon.data)
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
                    {song.map((item, index) => (<Songitem key={index} name={item.Name} desc={item.Description} id={item.id} image={item.Images} />
                    ))}

                </div>
            </div>
            
            
        </>
    )
}
export default DisplayHome





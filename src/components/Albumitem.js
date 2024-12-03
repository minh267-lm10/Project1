import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import img1 from "../assets/img6.png";


const Albumitem = ({ image, name, desc, id }) => {
    const navigate = useNavigate()
    const [checkimg,setcheckimg]=useState()
    useEffect(()=>{
        const checkimgnull=async()=>{
            try {
             let   res= await axios.get(image)
             setcheckimg(image)
                
            } catch (error) {
                setcheckimg('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFkbvS5hOclbltXVzheWMVot9nZihE7F8gaw&s')
                
            }
          
        }
        checkimgnull()
    },[])


    return (
        <div onClick={() => navigate(`/album/${id}`)} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
           <img className="rounded w-[180px] h-[180px] object-cover" src={checkimg} alt="" />
            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate-200 text-sm">{desc}</p>
        </div>
    )
}

export default Albumitem
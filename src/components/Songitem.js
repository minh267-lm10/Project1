import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Songitem = ({ image, name, desc, id ,callbacksong,index}) => {
    const { playWithId } = useContext(PlayerContext);
    let setnhac=(it)=>{
        callbacksong()
        playWithId(index)
    }

    return (
        <div onClick={()=>{setnhac(index)}} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
            {/* Sử dụng backticks để định nghĩa chuỗi với biến */}
            <img className="rounded" src={`http://localhost:8888/api/v1/music${image}`} alt={name} />
            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate-200 text-sm">{desc}</p>
        </div>
    );
}

export default Songitem;

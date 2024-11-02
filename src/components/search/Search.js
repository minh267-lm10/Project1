import React,{useContext, useEffect} from 'react';
import PlayerContextProvider, { PlayerContext } from '../../context/PlayerContext';
import { assets, songsData } from '../../assets/assets';
import { initializeSongsData } from '../../assets/assets';
function Search(props) {
    const {searchActive, setSearchActive,playWithId} = useContext(PlayerContext);
    const {searchTerm} = useContext(PlayerContext);
    const {searchResults} = useContext(PlayerContext);
    let setnhacchay=(index)=>{
      initializeSongsData(searchResults)
      playWithId(index)
    }
    

    
    return (

        <div>
            <>Đây là kết quả trang tìm kiếm 
            <ul className="list-none">
            {" "}
            {/* Áp dụng class list-none */}
            {searchTerm != "" && (
              <>
              <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p><b className="mr-4">#</b>Tên</p>
                <p>Miêu tả</p>
                <p className="hidden sm:block ">Ngày thêm</p>
                <img className="m-auto w-4 " src={assets.clock_icon} alt="" />
            </div>
            <hr />
              {
                
                searchResults.map((item, index) => (
                    <div onClick={() => {setnhacchay(index)}} key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
                        <p className="text-white">
                            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                            <img className="inline w-10 mr-5 " src={`http://localhost:8888/api/v1/music${item.image}`}  alt="" />
                            {item.name}
                        </p>
                        <p className="text-[15px]">{ item.desc}</p>
                        <p className="text-[15px] hidden sm:block ">5 days ago</p>
                        <p className="text-[15px] text-center ">{item.duration=0? "5.00":"5.00"}</p>
                    </div>
                ))
            }
              </>
            )}
          </ul>
         
            </>

        </div>
    );
}

export default Search;
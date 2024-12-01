import React,{useContext, useEffect} from 'react';
import  { PlayerContext } from '../../context/PlayerContext';
import { assets} from '../../assets/assets';
import { initializeSongsData } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function Search(props) {
    const {searchActive, setSearchActive,playWithId} = useContext(PlayerContext);
    const {setSearchTerm} = useContext(PlayerContext);
    const {searchResults,searchResultsinger} = useContext(PlayerContext);
   
    const navigate = useNavigate();

    let setnhacchay=(index)=>{
      initializeSongsData(searchResults)
      playWithId(index)
    } 
    return (

        <div>
            <>
            <h2 className="my-5 font-bold text-2xl">Đây là trang kết quả tìm kiếm</h2>

            <ul className="list-none">
            {" "}
            {/* Áp dụng class list-none */}
            {searchResults && (
              <>
              <h2 className="my-5 font-bold text-2xl">Bài hát</h2>

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
                            <img className="inline w-10 mr-5 " src={item.image}  alt="" />
                            {item.name}
                        </p>
                        <p className="text-[15px]">{ item.desc}</p>
                        <p className="text-[15px] hidden sm:block ">5 days ago</p>
                        <p className="text-[15px] text-center ">{item.duration=0? "5.00":"5.00"}</p>
                    </div>
                ))
            }
            {searchResultsinger&&(<>
              <h2 className="my-5 font-bold text-2xl">Nghệ sĩ</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p><b className="mr-4">#</b>Tên</p>
                <p>Quốc gia</p>
                <p className="hidden sm:block ">Vai trò</p>
                <p className="text-[15px] text-center ">Ngày sinh</p>
                
            </div>
              {
                
                searchResultsinger.map((item, index) => (
                    <div onClick={()=>{navigate(`/infoaccountsinger/${item.userId}`)}} key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
                        <p className="text-white">
                            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                            <img className="inline w-10 mr-5 " src={item.img} alt="" />
                            {item.stageName}
                        </p>
                        <p className="text-[15px]">{ item.city}</p>
                        <p className="text-[15px]">Ca sĩ</p>

                        
                        {/* <p className="text-[15px] hidden sm:block ">5 days ago</p> */}
                        <p className="text-[15px] text-center ">{item.dob}</p>
                    </div>
                ))
            }
            </>)

            }
           

              </>
            )}
          </ul>
         
            </>

        </div>
    );
}

export default Search;
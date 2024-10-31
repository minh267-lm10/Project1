import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { albumsData } from "../assets/assets";
import Albumitem from "./Albumitem";
import Songitem from "./Songitem";
import Apisong from "../Api/Apisong";
import { initializeSongsData } from "../assets/assets";
import { songsData } from "../assets/assets";

const DisplayHome = () => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Apisong.apigetallsong(currentPage, itemsPerPage);
        setData(response.data.result.data);
        setTotalItems(response.data.result.totalElements);
      } catch (err) {}
    };

    fetchData();
  }, [currentPage]);
  const callbacksong=()=>{
    initializeSongsData(data)
    console.log(songsData)
  }


  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <>
      <NavBar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <Albumitem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-x-auto whitespace-nowrap gap-4">
          {data.map((item, index) => (
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

      <div className="pagination flex justify-center items-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-2 py-1 text-sm rounded border transition-colors duration-200
                ${
                  currentPage === index + 1
                    ? "bg-black text-white" // Màu nền đen và chữ trắng cho trang hiện tại
                    : "bg-white text-black border-black" // Nền trắng và chữ đen cho các trang khác
                } hover:bg-black hover:text-white`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default DisplayHome;

import React, { useContext, useEffect, useState } from "react";
import Apiuser from "../../Api/Apiuser";
import { PlayerContext } from "../../context/PlayerContext";

function AccountPost() {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [openpost, setOpenpost] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State hiển thị thông báo
  const { datauser } = useContext(PlayerContext);

  const fetchsendpost = async () => {
    try {
      let b = { content: postContent };
      await Apiuser.apicreatepost(b);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); 
      }, 3000);
    } catch (error) {
      alert( error.response?.data.message );
    }
  };

  const handlePost = async () => {
    if (postContent.trim()) {
      await fetchsendpost();
      await fetchloadpost();
      setPostContent("");
    }
  };

  const fetchloadpost = async () => {
    try {
      let res = await Apiuser.apigetuserpost();
      setPosts(res.data.result.data);
    } catch (error) {
      alert("Lỗi khi tải bài viết: " + error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchloadpost();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString("vi-VN", options);
  };

  return (
    <div>
      <div className="flex flex-col items-start p-4 bg-black rounded-lg min-h-screen">
        {openpost === false && (
          <div className="flex items-center space-x-2">
            <p className="text-gray-200">Hôm nay của bạn thế nào?</p>
            <button
              onClick={() => setOpenpost(true)}
              className="px-4 py-1 bg-[#434750] text-white rounded-md hover:bg-[#4e535d] transition duration-200"
            >
              Tạo bài viết
            </button>
          </div>
        )}
        <br/>
        {openpost === true && (
          <div className="w-full max-w-lg bg-[#333131] p-4 rounded-lg shadow-lg mb-6">
            <textarea
              className="w-full h-24 p-2 border text-gray-200 border-gray-600 rounded-md resize-none focus:outline-none bg-[#2b2b2b]"
              placeholder="Bạn đang nghĩ gì?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
            <button
              onClick={handlePost}
              className="w-full mt-2 p-2 bg-[#434750] text-white rounded-md hover:bg-[#4e535d] transition duration-200"
            >
              Đăng bài
            </button>
          </div>
        )}
        {showAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#434750] text-white px-4 py-2 rounded-md shadow-lg">
            Đã đăng bài thành công!
          </div>
        )}
        <div className="w-full">
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex bg-[#2a2a2a] p-4 rounded-md shadow mb-4 items-start"
            >
              <img
                src={datauser.img}
                alt="Post thumbnail"
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div className="flex-1">
                <p className="text-gray-200 font-bold mb-1">
                  {datauser?.stageName}
                </p>
                <span className="text-gray-500 text-sm">
                  {formatDate(post.createdDate)}
                </span>
                <p className="text-gray-200">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountPost;

import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import Apiuser from '../../Api/Apiuser';

function Postartist(props) {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [openpost, setOpenpost] = useState(false);
  const [notification, setNotification] = useState(null); // Thêm state cho thông báo
  let allorpost = false;
  let fetchsendpost = async () => {
    try {
      let b = {
        content: postContent,
      };
      let response = await Apiuser.apicreatepost(b);
      console.log(response.data.result.content);
      // Hiển thị thông báo khi đăng bài thành công
      setNotification('Đã đăng bài thành công!');
      setTimeout(() => setNotification(null), 3000); // Ẩn thông báo sau 3 giây
    } catch (error) {
      alert( error.response.data.message);
    }
  };

  const handlePost = async () => {
    fetchsendpost();
    if (postContent.trim()) {
      await setTimeout(() => {
        fetchloadpost();
      }, 500);

      setPostContent('');
    }
  };

  let fetchloadpost = async () => {
    try {
      let res = await Apiuser.apigetpostfollow();
      setPosts(res.data.result.data);
    } catch (error) {
      console.log('Lỗi tải bài viết:', error.response?.data);
    }
  };

  useEffect(() => {
    fetchloadpost();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(dateString).toLocaleString('vi-VN', options);
  };

  return (
    <div>
      <NavBar allorpost={allorpost} />
      <br />
      <h4 className="text-lg mb-2">Thỏa thích sáng tạo, không tiếc thanh xuân</h4>
      <div className="flex flex-col items-start p-4 bg-black min-h-screen">
        {notification && ( // Hiển thị thông báo khi có
          <div className="bg-green-500 text-white px-4 py-2 rounded mb-4">
            {notification}
          </div>
        )}

        {/* {openpost === false && (
          <div className="flex items-center space-x-2">
            <p className="text-gray-200">Hôm nay của bạn thế nào?</p>
            <button
              onClick={() => setOpenpost(true)}
              className="px-4 py-1 bg-[#434750] text-white rounded-md hover:bg-[#4e535d] transition duration-200 w-auto"
            >
              Tạo bài viết
            </button>
            <br />
            <br />
            <br />
          </div>
        )} */}
        <h4 className="text-lg mb-2">Hãy follow thêm nhiều nghệ sĩ để thấy bài viết của họ</h4>

        {openpost === true && (
          <>
            <div className="w-full max-w-lg bg-[#1f1f1f] p-4 rounded-lg shadow-lg mb-6">
              <textarea
                className="w-full h-24 p-2 border text-gray-200 border-gray-600 rounded-md resize-none focus:outline-none focus:border-white-400 bg-[#2b2b2b]"
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
          </>
        )}
        <div className="w-full">
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex bg-[#2a2a2a] p-4 rounded-md shadow mb-4 items-start"
            >
              <img
              src={post.imgUser}
                alt="Post thumbnail"
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div className="flex-1">
                <p className="text-gray-200 font-bold mb-1">{post.stageName}</p>
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

export default Postartist;

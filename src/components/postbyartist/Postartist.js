import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import Apiuser from '../../Api/Apiuser';

function Postartist(props) {
    const [postContent, setPostContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [openpost, setOpenpost] = useState(false);
    let allorpost = false;

    let fetchsendpost = async () => {
        try {
            let b = {
                content: postContent
            };
            let response = await Apiuser.apicreatepost(b);
            console.log(response.data.result.content);
            // alert("Du lieu về là :" + response.data.result.content);
        } catch (error) {
            alert("loi roi" + error.response.data);
            console.log("aaa", error.response.data);
        }
    };

    const handlePost = async() => {
         fetchsendpost();
        if (postContent.trim()) {
            await setTimeout(() => {
                fetchloadpost()
              }, 500);
            
            // setPosts([{ content: postContent, createdDate: new Date() }, ...posts]); // Sử dụng createdDate thay vì timestamp
            setPostContent('');
        }
    };
    let fetchloadpost = async () => {
        try {
            let res = await Apiuser.apigetuserpost();
            setPosts(res.data.result.data);
        } catch (error) {
            alert("loi o load post:" + error.response.data);
        }
    };

    useEffect(() => {
        fetchloadpost()
    }, []);

    // Hàm định dạng thời gian
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleString('vi-VN', options);
    };

    return (
        <div>
            <NavBar allorpost={allorpost} />
            <br />
            <div className="flex flex-col items-start p-4 bg-black min-h-screen">
                {openpost === false && (
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
                )}
                {openpost === true && (
                    <>
                        {/* Form nhập liệu */}
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
                <div className="w-full ">
                    {posts.map((post, index) => (
                        <div key={index} className="bg-[#2a2a2a] p-4 rounded-md shadow mb-4">
                            <p className="text-gray-200">{post.content}</p>
                            <span className="text-gray-500 text-sm">
                                {formatDate(post.createdDate)} {/* Sử dụng hàm formatDate để định dạng thời gian */}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Postartist;

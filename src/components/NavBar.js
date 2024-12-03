import React, { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import '../css/menudrop.css';
import Apiuser from "../Api/Apiuser";
import { getToken, removeToken } from "../Service/Localtokenservice";

const NavBar = ({allorpost}) => {
    const { datauser, setDatauser,setSearchTerm } = useContext(PlayerContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    

    const checklogin = () => {
        setSearchTerm('')       
        navigate('/Login');
    };

    const setlogout = () => {
        removeToken();
        setSearchTerm('')
        setDatauser([])
   

        navigate('/');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const fetchUserInfo = async () => {
        try {
            const response = await Apiuser.getProfile(); 
            setDatauser(response.data.result);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };
    const routevnp = async () => {
        
      
        try {
          // Gửi request đến API
          const response =await Apiuser.apipayment()
          console.log(response.data)
      
       
        // Nếu API trả về HTML, điều hướng đến trang đó
      const paymentUrl = response.request.responseURL; // Lấy URL từ response
      window.location.href = paymentUrl;
        } catch (error) {
          console.error("Lỗi:", error);
          alert("Có lỗi xảy ra khi gọi API.");
        }
      };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        if (getToken()) {
            fetchUserInfo();
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                    <img 
                        onClick={() => navigate(-1)} 
                        className="w-8 bg-black p-2 rounded-2xl cursor-pointer" 
                        src={assets.arrow_left} 
                        alt="Go Back" 
                    />
                    <img 
                        onClick={() => navigate(1)} 
                        className="w-8 bg-black p-2 rounded-2xl cursor-pointer" 
                        src={assets.arrow_right} 
                        alt="Go Forward" 
                    />
                </div>
                <div className="flex items-center gap-4">
                    {getToken() ? (
                        <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer" onClick={routevnp}>
                            Explore Premium
                        </p>
                    ) : ' '}

                    <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">Install App</p>
                    {!getToken() ? (
                        <p onClick={checklogin} className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
                            Login
                        </p>
                    ) : (
                        <>
                            <p onClick={toggleMenu} className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">
                            {datauser?.username ? datauser.username.charAt(0).toUpperCase() : 'A'}
                            </p>
                            {isOpen && (
                                <div className="dropdown-menu" ref={menuRef}>
                                    <ul>                          
                                        <li><a href="#account">User: {datauser?.username || 'Admin'}</a></li>
                                        <li><a href="#profile">City: {datauser?.city || 'Unknown'}</a></li>
                                        <li><a onClick={() => {setSearchTerm('')
                                             navigate('/infoaccount') }}>Profile</a></li>                                               
                                        <li><a onClick={setlogout}>Logout</a></li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {allorpost===true&&(
                <>  <div className="flex items-center gap-2 mt-4">
                <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer" onClick={()=>navigate('/')}>All</p>
                <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer" onClick={()=>navigate('/post')}>Post by artist</p>
            </div></>
            )}
            {allorpost===false&&(
                <>  <div className="flex items-center gap-2 mt-4">
                <p className="bg-black text-white px-4 py-1 rounded-2xl cursor-pointer" onClick={()=>navigate('/')}>All</p>
                <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer" onClick={()=>navigate('/post')}>Post by artist</p>
            </div></>
            )}
          
        </>
    );
};

export default NavBar;

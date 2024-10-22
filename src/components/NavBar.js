import React, { useContext,useEffect,useState,useRef } from "react";
import { assets } from "../assets/assets";
import {  useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import '../css/menudrop.css'

const NavBar = () => {
    const { login,setlogin } = useContext(PlayerContext)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    let setchu=()=>{
        if(login=="Login")
        {
            setlogin("Logout")
        navigate('/Login')
        }
            
        else
        {
            setlogin("Login")
            navigate('/')
        }
            
      

    }
    useEffect(()=>{},[login])

  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [menuRef]);
    
    

    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                    <img onClick={() => navigate(-1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_left} alt="" />
                    <img onClick={() => navigate(1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_right} alt="" />
                </div>
                <div className="flex items-center gap-4">
                {login=='Logout'?<p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">Explore Premium</p>
                :' '}

                    <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">Install App</p>
                    {login=='Login'? <p onClick={setchu} className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">{login}</p>
                :<>      <p onClick={toggleMenu} className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" >
                    {login=='Login'? 'S': 'L'}</p>
                    {isOpen && (
                        <div className="dropdown-menu" ref={menuRef}>
                            <ul>                          
                                <li><a href="#account">User: Luyendz</a></li>
                                <li><a href="#profile">Role: custom</a></li>
                                <li><a onClick={()=>{navigate('/infoaccount')}}>Profile</a></li>                                               
                                <li><a onClick={setchu}>{login}</a></li>
                            </ul>
                        </div>
                    )}</>}
               </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">All</p>
                <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
                <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Podcasts</p>
            </div>
       
        </>
        
    )
}
export default NavBar;
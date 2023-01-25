import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutCircleFill } from "react-icons/ri";
import * as type from "../Redux/actionCreators/types";



function FooterButton() {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout= ()=>{
      dispatch({ type: type.signoutType})
      navigate('/')
    }
  

    return (
    <div className="fixed tablet:hidden bottom-[0px] tablet:w-[calc(100%-220px)] w-[100%] z-20">
        {/* -------------Add footer buttons start-------------- */}
        <div className="flex justify-evenly h-[75px]  items-center bg-[#F4F4F4]">
          <Link
              to="/home"
              className={`justify-self-center text-[23px] p-8 flex hover:text-[#0E4E48] ${
                location.pathname.includes("/home")
                  ? "text-[#0E4E48]"
                  : "text-[#A6B7AF]"
              }`}
              >
              <AiFillHome />
            </Link>
            <Link
              to="/profile"
              className={`justify-self-center text-[23px] p-8 flex hover:text-[#0E4E48] ${
                location.pathname.includes("/profile")
                  ? "text-[#0E4E48]"
                  : "text-[#A6B7AF]"
              }`}
              >
              <FaUserAlt />
            </Link>
            <div onClick={handleLogout} className="justify-self-center text-[23px] p-8 flex hover:text-[#0E4E48] text-[#A6B7AF] cursor-pointer">
              <RiLogoutCircleFill/>
            </div>
        </div>
        {/* -------------Add footer buttons ends-------------- */}
    </div>
  )
}

export default FooterButton
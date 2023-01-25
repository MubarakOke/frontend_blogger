import React, { useRef, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutCircleFill } from "react-icons/ri";
import Logo1 from "../Assets/image/Logo2.png";
import Logo from "../Assets/svg/Logo.svg";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as type from "../Redux/actionCreators/types";

const home = <AiFillHome />;
const profile = <FaUserAlt />;
const logout = <RiLogoutCircleFill />;


const SidebarContent = [
  {
    link: "/home",
    icon: home,
    title: "Home",
  },
  {
    link: "/profile",
    icon: profile,
    title: "Profile",
  },
  {
    link: "/logout",
    icon: logout,
    title: "Logout",
  },
];


const Navbar = ({ title, hamburger, setHamburger}) => {
  const HeaderRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout= ()=>{
    dispatch({ type: type.signoutType})
    navigate('/')
  }

  const renderSidebarContent = () => {
      return SidebarContent.map((item, index) => {
        if(item.title==="Logout"){
          return (<div
                key={index}
                onClick={handleLogout}
                className={` flex text-base font-medium my-3 hover:bg-[] hover:text-white  rounded-l-md hover:shadow-sm hover:shadow-[#000000] cursor-pointer p-2 ${
                  location.pathname.includes(item.link)
                    ? "bg-[#0E4E48] text-white "
                    : "text-gray-500"
                }`}
              >
                <div className="flex items-center">
                  {" "}
                  <div className="mr-3"> {item.icon}</div>
                  <div> {item.title} </div>
                </div>
              </div>)
          }
        return (
          <Link
            to={item.link}
            key={index}
            className={` flex text-base font-medium my-3 hover:bg-[] hover:text-white  rounded-l-md hover:shadow-sm hover:shadow-[#000000] p-2 ${
              location.pathname.includes(item.link)
                ? "bg-[#0E4E48] text-white "
                : "text-gray-500"
            }`}
          >
            <div className="flex items-center">
              {" "}
              <div className="mr-3"> {item.icon}</div>
              <div> {item.title} </div>
            </div>
          </Link>
        );
      });
  };

  const toggleNavbarBody=(e) => {
    if (HeaderRef.current && HeaderRef.current.contains(e.target)) {
      return;
    }
    handleHamburger(0);
  };

  useEffect(() => {
    document.body.addEventListener("click", toggleNavbarBody)
    
    return () =>{
      document.body.removeEventListener("click", toggleNavbarBody)
    }
  }, []);



  const handleHamburger = (a) => {
    setHamburger(a);
  };
 
  
  return (
    <div> 
      {/* -----------------------------Header begins------------------------------ */}
      <div
        onClick={(e) => {
          if (HeaderRef.current.contains(e.target)) {
            if (hamburger === 1) {
              handleHamburger(0);
            }
            return;
          }
          handleHamburger(0);
        }}
        ref={HeaderRef}
        className={`tablet:w-[calc(100%-220px)] w-screen tablet:top-[0] tablet:left-[220px] tablet:rounded-b-[0] tablet:h-[60px] h-[80px] rounded-b-[10px] p-6 bg-[#D7EBE2] flex items-center justify-between fixed top-0 z-10 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]  ${
          hamburger ? "blur-sm" : ""
        }`}
      >
        <GiHamburgerMenu
          onClick={() => {
            handleHamburger(1);
          }}
          className="text-[#0E4E48] tablet:hidden font-bold tablet:text-[18px] text-[24px] cursor-pointer"
        />
        <span className="text-[#0E4E48] font-bold tablet:text-[16px] text-[24px] font-['Roboto'] ml-[45px]">
          {title}
        </span>
        <img src={Logo1} alt="logo" className="tablet:h-[62px] tablet:w-[61px] h-[84px] w-[83px]" />
      </div>

      {/* ----------------------------------sidebar beigns------------------------------------ */}
      <div
        className={`h-full tablet:w-[220px] tablet:block w-1/2 pl-5 bg-[#E8E8E8] z-50 shadow-lg shadow-[#807b7b] tablet:rounded-r-[0px] rounded-r-[20px] fixed top-0 left-0 ${
          hamburger ? " visible " : " hidden "
        }`}
      >
        <GrClose
          onClick={() => {
            handleHamburger(0);
          }}
          className="text-[#0E4E48] tablet:hidden font-bold text-[24px] cursor-pointer my-14"
        />
        <div className="flex h-[110px] w-[110px] mb-[50px] mt-[25px] mx-auto tablet:grid hidden justify-center">
        <img src={Logo} alt="Logo" />
        </div>
        {renderSidebarContent()}
      </div>
    </div>
  );
};
export default Navbar;

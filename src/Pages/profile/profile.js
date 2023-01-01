import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../Assets/image/Avatar.jpg";
import Edit from "../../Assets/svg/edit.svg";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar";
import FooterButton from "../../Components/footerbutton";

const Profile = () => {
  const [hamburger, setHamburger] = React.useState(0);
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar
        title="Profile"
        hamburger={hamburger}
        setHamburger={setHamburger}
        show="customer"
      />
      <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
      <div
        className={`${
          hamburger ? "blur-sm" : ""
        } h-screen pt-[90px]  z-0 px-8 laptop:w-[500px] tablet:w-[410px] laptop:ml-[70px]  tablet:mx-auto`}
      >
        <div className="flex tablet:mt-10 laptop:h-[250px] laptop:w-[250px] justify-center items-center laptop:absolute laptop:top-[45px] laptop:right-[20px]">
        <img src={auth.picture? auth.picture:Avatar} alt="" className="laptop:h-[200px] border border-[grey] rounded-full laptop:w-[200px] h-[150px] w-[150px]" />
        </div>

        <div className="flex justify-end laptop:absolute tablet:top-[440px] laptop:right-[125px]">
          <Link to="/profile/edit">
            {" "}
            <img src={Edit} alt="Edit" className="cursor-pointer" />
          </Link>
        </div>
        <div className="flex justify-center">
          <span className="font-bold text-[26px] font-[Roboto]">
            {auth.fullname}
          </span>
        </div>
        <div className="flex items-end justify-between mt-6 laptop:w-[85%]">
          <div className="flex flex-col items-center">
            <span className="font-bold text-[20px] font-[roboto]">1,260</span>
            <span className="text-[#AFAFAF] text-[16px] font-[roboto]">
              total Order
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-[20px] font-[roboto]">1,260</span>
            <span className="text-[#AFAFAF] text-[16px] font-[roboto]">
              Cancel Order
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-[20px] font-[roboto]">1,260</span>
            <span className="text-[#AFAFAF] text-[16px] font-[roboto]">
              Completed Order
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-5 justify-between h-[300px]">
          <div className="flex flex-col">
            <span className="text-[#AFAFAF] text-[14px]">Last Name</span>
            <span className="font-bold text-[16px]">{auth.user.last_name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#AFAFAF] text-[14px]">First Name</span>
            <span className="font-bold text-[16px]">{auth.user.first_name}</span>
          </div>
          {auth.user.middle_name? <div className="flex flex-col">
            <span className="text-[#AFAFAF] text-[14px]">Other Name</span>
            <span className="font-bold text-[16px]">{auth.user.middle_name}</span>
          </div>:""}
          <div className="flex flex-col">
            <span className="text-[#AFAFAF] text-[14px]">Phone Number</span>
            <span className="font-bold text-[16px]">{auth.user.phone}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#AFAFAF] text-[14px]">Email</span>
            <span className="font-bold text-[16px]">{auth.user.email}</span>
          </div>
        </div>
      </div>
      </div>
      <FooterButton/>
    </div>
  );
};

export default Profile;

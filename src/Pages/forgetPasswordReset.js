import React, { useState } from "react";
import Logo from "../Assets/svg/Logo.svg";
import baseAPI from "../Api/baseApi"
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { showSpinner, hideSpinner } from "../Redux/actionCreators/spinnerAction";


const ForgotPaswordReset = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password1 || !password2){
        return
    }
    let formData = new FormData();
    formData.append("password1", password1);
    formData.append("password2", password2);
    formData.append("token", params.token);
    formData.append("user", params.user);
    dispatch(showSpinner())
    try{
      const response= await baseAPI.post(`/account/reset-password/`, formData);
      dispatch(hideSpinner())
      toast.success("Password successfully reset")
    }
    catch(err){
      dispatch(hideSpinner())
      toast.error(err.response.data.error)
    }
  };


  return (
    <div className="px-10 py-4 laptop:w-[550px] tablet:w-[500px] tablet:mx-auto">
      <div className="flex justify-center w-full">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="flex flex-col mt-12">
        <span className="text-[30px] font-bold text-[#595959] mb-4">
          Reset Password
        </span>
      </div>
      <div className="tablet:text-[19px] text-[16px]">
          Please enter set your new password
      </div>
      <div className="flex flex-col">
        {/* -------------------------------email input-------------------------------------- */}
        <div className="relative group mt-10">
          <input
            onChange={(e)=>{setPassword1(e.target.value)}}
            type="password"
            placeholder="password"
            required
            className="w-full tablet:!text-[15px] rounded-[10px] tablet:h-[45px] h-10 outline-none border-2 border-[#0E4E48] p-2"
          />
        </div>
      </div>
      <div className="flex flex-col">
        {/* -------------------------------email input-------------------------------------- */}
        <div className="relative group mt-5">
          <input
            onChange={(e)=>{setPassword2(e.target.value)}}
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full tablet:!text-[15px] rounded-[10px] tablet:h-[45px] h-10 outline-none border-2 border-[#0E4E48] p-2"
          />
        </div>
      </div>
      <div
        onClick={handleSubmit}
        className="cursor-pointer mt-8 flex items-center justify-center bg-[#0E4E48] rounded-[10px] tablet:p-4 p-3 text-[#fff] font-"
      >
        Reset
      </div>
      <div className="font-bold text-center mt-5">
          <span className="text-base tablet:text-[19px] text-[#8A8B8B]">
            Go back to 
          </span>

          <Link to="/" className="text-[red] tablet:text-[19px]"> Sign in</Link>
        </div>
    </div>
  );
};

export default ForgotPaswordReset;

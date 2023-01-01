import React, { useState } from "react";
import Logo from "../Assets/svg/Logo.svg";
import baseAPI from "../Api/baseApi"
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { showSpinner, hideSpinner } from "../Redux/actionCreators/spinnerAction";


const ForgotPasword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email){
        return
    }
    let formData = new FormData();
    formData.append("email", email);
    dispatch(showSpinner())
    try{
      const response= await baseAPI.post(`/account/customer/reset-password-request/`, formData);
      dispatch(hideSpinner())
      toast.success("Password reset link has been sent to your email")
    }
    catch(err){
      dispatch(hideSpinner())
      toast.error(err.response.data.error)
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="px-10 py-4 laptop:w-[550px] tablet:w-[500px] tablet:mx-auto">
      <div className="flex justify-center w-full">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="flex flex-col mt-12">
        <span className="text-[30px] font-bold text-[#595959] mb-4">
          Forgot Password
        </span>
      </div>
      <div className="tablet:text-[19px]">
          Please enter your email below, we will contact you with a link to set a new password
      </div>
      <div className="flex flex-col">
        {/* -------------------------------email input-------------------------------------- */}
        <div className="relative group mt-10">
          <input
            onChange={handleEmail}
            type="email"
            id="email"
            placeholder="email"
            required
            className="w-full tablet:!text-[15px] rounded-[10px] tablet:h-[45px] h-10 outline-none border-2 border-[#0E4E48] p-2"
          />
        </div>
      </div>
      <div
        onClick={handleSubmit}
        className="cursor-pointer mt-8 flex items-center justify-center bg-[#0E4E48] rounded-[10px] tablet:p-4 p-3 text-[#fff] font-"
      >
        Send
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

export default ForgotPasword;

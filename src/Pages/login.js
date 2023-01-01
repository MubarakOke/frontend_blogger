import React, { useState } from "react";
import Logo from "../Assets/svg/Logo.svg";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { SignInAction } from "../Redux/actionCreators/signinAction";
import { useNavigate, Link } from "react-router-dom";
import DisplayError from "../Components/displayError";


const Login = () => {
  const [showpassword, setShowpassword] = useState(0);
  const [toggleText, setToggleText] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(1);
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(SignInAction(navigate, formData));
  };

  const renderError= ()=>{
    if(error && error.login){
      return (<DisplayError message={error.login} />)
    }else{
      return
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // ---------------------testing-------------------------------------------

  const handlePassword = (e) => {
    if (e.target.value.length > 0) {
      setShowpassword(1);
    } else {
      setShowpassword(0);
    }
    setPassword(e.target.value);
  };
  const handleShowPassword = () => {
    if (toggleText === "password") {
      setToggleText("text");
      setPasswordIcon(0);
    } else {
      setToggleText("password");
      setPasswordIcon(1);
    }
  };

  return (
    <div className="px-10 py-4 laptop:w-[550px] tablet:w-[500px] tablet:mx-auto">
      <div className="flex justify-center w-full">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="flex flex-col mt-12">
        <span className="text-[30px] font-bold text-[#595959] mb-4">
          Welcome Back!
        </span>
      </div>
      {/* ---------------Error display start------------------- */}
      { renderError()}
      {/* ---------------Error display end------------------- */}
      <div className="flex flex-col">
        {/* -------------------------------email input-------------------------------------- */}
        <div className="relative group mt-10">
          <input
            onChange={handleEmail}
            type="email"
            id="email"
            required
            className="w-full tablet:!text-[15px] tablet:h-[45px] h-10 text-sm peer outline-none border-b-2 p-2"
          />

          <label className="text-[#8A8B8B] tablet:!text-[17px] pb-4 transform transition-all absolute top-0 left-0 h-full flex items-center pl-1 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">
            Email
          </label>
        </div>

        {/* --------------------------------Password input----------------------------------- */}

        <div className="relative group mt-10 flex items-center">
          <input
            onChange={handlePassword}
            type={toggleText}
            id="password"
            required
            className="w-full tablet:!text-[15px] tablet:h-[45px] h-10 text-sm peer outline-none border-b-2 p-2"
          />

          <label className="text-[#8A8B8B] tablet:!text-[17px] pb-4 transform transition-all absolute top-0 left-0 h-full flex items-center pl-1 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">
            Password
          </label>
          <div
            className="text-[20px] absolute right-0 cursor-pointer"
            onClick={handleShowPassword}
          >
            {passwordIcon ? (
              <AiOutlineEye
                className={`text-[#8A8B8B] text-[20px] ${
                  showpassword ? "" : "hidden"
                }`}
              />
            ) : (
              <AiOutlineEyeInvisible
                className={`text-[#8A8B8B] text-[20px] ${
                  showpassword ? "" : "hidden"
                }`}
              />
            )}
          </div>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <div className="text-[#8A8B8B] flex items-center ">
            <input type={"checkbox"} className="outline-none " />
            <span className="font-normal pl-1 text-[15px]"> Remember me</span>
          </div>
          <Link to="/forget-password" className="font-bold text-[#8A8B8B] text-[15px] cursor-pointer">
            Forgot Password?
          </Link>
        </div>
      </div>
      <div
        onClick={handleSubmit}
        className="cursor-pointer mt-10 flex items-center justify-center bg-[#0E4E48] rounded-[10px] tablet:p-4 p-3 text-[#fff] font-"
      >
        Sign in
      </div>
      <div className="font-bold text-center mt-5">
          <span className="text-base tablet:text-[19px] text-[#8A8B8B]">
            Don't have an account?
          </span>

          <Link to="/signup" className="text-[red] tablet:text-[19px]"> Sign up now!</Link>
        </div>
    </div>
  );
};

export default Login;

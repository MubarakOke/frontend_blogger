import React, { useState } from "react";
import Logo from "../Assets/svg/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignupAction } from "../Redux/actionCreators/signupAction";
import toast, { Toaster } from "react-hot-toast";
import DisplayError from "../Components/displayError";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_Password] = useState("");
  const [showError, setShowError] = useState("hidden");

  const handleSubmit = async (e) => {
    if (confirm_password !== password) {
      setShowError("");
      return;
    }
    e.preventDefault();
    let formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);

    dispatch(SignupAction(navigate, formData));
  };

  const renderError= ()=>{
    if(error && error.signup){
      return Object.entries(error.signup).map(([key, value])=>{
        switch(key){
          case "email":
            return (<DisplayError message={value} />);
          case "first_name":
            return (<DisplayError message={"Firstname field may not be blank"} />)
          case "last_name":
            return (<DisplayError message={"Lastname field may not be blank"} />)
          case "phone":
            return (<DisplayError message={"Phone Number field may not be blank"} />)
        }
      })
    }else{
      return
    }
  }

  const handleChange = (e) => {
    switch (e.target.placeholder) {
      case "First Name":
        setFirstName(e.target.value);
        break;
      case "Last Name":
        setLastName(e.target.value);
        break;
      case "Email":
        setEmail(e.target.value);
        break;
      case "Phone Number":
        setPhone(e.target.value);
        break;
      case "Password":
        setPassword(e.target.value);
        break;
      case "Confirm password":
        setconfirm_Password(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="px-6 py-4 laptop:w-[550px] tablet:w-[500px] tablet:mx-auto">
      <div className="flex justify-center w-full">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="flex flex-col mt-5">
        <span className="text-[30px] font-bold text-[#595959]">
          Create Account
        </span>
      </div>
      {/* ---------------Error display start------------------- */}
      { renderError()}
      {/* ---------------Error display end------------------- */}
      <div className="flex flex-col">
        <input
          placeholder={"First Name"}
          type={"text"}
          className="outline-none border-b-2 p-2 mt-2"
          onChange={handleChange}
        />
        <input
          placeholder={"Last Name"}
          type={"text"}
          className="outline-none border-b-2 p-2 mt-6"
          onChange={handleChange}
        />
        <input
          placeholder={"Email"}
          type={"email"}
          className="outline-none mt-6 border-b-2 p-2"
          onChange={handleChange}
        />
        <input
          placeholder={"Phone Number"}
          type={"phone"}
          className="outline-none border-b-2 p-2 mt-6 "
          onChange={handleChange}
        />
        <div className={`text-[red] mt-6 ${showError}`}>
          Passwords don't match!
        </div>
        <input
          placeholder={"Password"}
          type={"password"}
          className="outline-none border-b-2 p-2 mt-6 "
          onChange={handleChange}
        />
        <input
          placeholder={"Confirm password"}
          type={"password"}
          className="outline-none border-b-2 p-2 mt-6 "
          onChange={handleChange}
        />
      </div>
      <div
        onClick={handleSubmit}
        className="cursor-pointer mt-9 flex items-center justify-center bg-[#0E4E48] rounded-[15px] p-3 text-[#fff] font-"
      >
        Submit
      </div>
      <div className="font-bold mt-5 text-center">
          <span className="text-base text-[#8A8B8B] tablet:text-[19px]">
            Already have an account?
          </span>
          <Link to="/" className="text-[red] tablet:text-[19px]">
            {" "}
            Sign in!
          </Link>
        </div>
    </div>
  );
};

export default SignUp;

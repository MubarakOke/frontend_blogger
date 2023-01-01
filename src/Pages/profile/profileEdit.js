import React, {useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import baseAPI from "../../Api/baseApi"
import Avatar from "../../Assets/image/Avatar.jpg";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateAuthAction } from "../../Redux/actionCreators/updateAuthAction";

const ProfileEdit = () => {
  const Navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch= useDispatch()
  const [selectedImage, setSelectedImage]= useState(null)
  const [firstName, setFirstName] = useState(auth.user.first_name||"");
  const [lastName, setLastName] = useState(auth.user.last_name||"");
  const [otherName, setOtherName] = useState(auth.user.middle_name||"");
  const [phone, setPhone] = useState(auth.user.phone||"");
  
  const onFileChange= (event)=>{
    setSelectedImage(event.target.files[0])
  }

  const onFileUpload= async(event)=>{
    const formData = new FormData();
    formData.append("picture", selectedImage);
    let toastID= toast.loading("uploading......", {position: "top-center", style: { color: "#0E4E48" }});
    try{
      const response= await baseAPI.put(`blog/blogger/${auth.id}/`, formData, {headers: {"Authorization": `Bearer ${auth.token}`}});
      dispatch(updateAuthAction(response.data.data))
      toast.dismiss(toastID)
      toast.success("picture uploaded successfuly")
    }
    catch(err){
      toast.dismiss(toastID)
      toast.error("picture not uploaded")
    }
  }

  const onDetailUpdate= async ()=>{
    const formData = new FormData();
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("middle_name", otherName)
    formData.append("phone", phone)

    let toastID= toast.loading("updating......", {position: "top-center", style: { color: "#0E4E48" }});
    try{
      const response= await baseAPI.put(`/customer/${auth.id}/`, formData, {headers: {"Authorization": `Bearer ${auth.token}`}});
      toast.dismiss(toastID)
      dispatch(updateAuthAction(response.data.data))
      toast.success("profile updated successfuly")
    }
    catch(err){
      toast.dismiss(toastID)
      toast.error("profile not updated")
    }
  }
  
  const onCancelUpload= ()=>{
    setSelectedImage(null)
  }

  return (
    <div className="px-6 pt-12">
      <div className="flex items-center justify-between">
        <MdOutlineArrowBackIosNew
          onClick={() => Navigate(-1)}
          className="text-[22px] text-black"
        />
        <span className="font-black text-[22px] font-[Roboto]">
          Edit Profile
        </span>
        <div></div>
      </div>
      <div className="flex justify-center items-center mt-10">
      <img src={selectedImage? URL.createObjectURL(selectedImage):auth.picture? auth.picture:Avatar} alt="" className="laptop:h-[200px] border border-[grey] rounded-full laptop:w-[200px] h-[150px] w-[150px]" />
      </div>
      <div className="flex justify-center mt-4">
        <div>
            <input className="hidden" onChange={onFileChange} type="file" accept="image/*" id="upload-button"/>
            {selectedImage?(<div>
                            <span onClick={onFileUpload} className="font-medium text-[18px] text-[#0E4E48] font-[Roboto] cursor-pointer">Upload</span>
                            <span onClick={onCancelUpload} className="font-medium  ml-3 text-[18px] text-[#FF6583] font-[Roboto] cursor-pointer">Cancel</span>
                            </div>)
                          : (<label htmlFor="upload-button" className="font-medium text-[18px] text-[#FF6583] font-[Roboto] cursor-pointer">
                              {auth.picture?"Change Picture":"Upload Picture"}
                          </label>)}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <input
          placeholder={"last Name"}
          onChange={(e)=>{setLastName(e.target.value)}}
          type={"text"}
          value={lastName}
          className="outline-none border-b-2 p-2 mt-10 font-medium"
        />
        <input
          placeholder={"First Name"}
          onChange={(e)=>{setFirstName(e.target.value)}}
          type={"text"}
          value={firstName}
          className="outline-none border-b-2 p-2 mt-10 font-medium"
        />
        <input
          placeholder={"Other Name"}
          onChange={(e)=>{setOtherName(e.target.value)}}
          type={"text"}
          value={otherName}
          className="outline-none border-b-2 p-2 mt-10 font-medium"
        />
        <input
          placeholder={"Phone Number"}
          type={"text"}
          onChange={(e)=>{setPhone(e.target.value)}}
          value={phone}
          className="outline-none border-b-2 p-2 mt-10 font-medium"
        />
      </div>

      <div onClick={onDetailUpdate} className="cursor-pointer mt-[60px] flex items-center justify-center bg-[#0E4E48] rounded-full p-3 text-[#fff] font-medium font-[Roboto]">
        Update
      </div>
    </div>
  );
}

export default ProfileEdit
import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Navbar from "../../Components/navbar";
import FooterButton from "../../Components/footerbutton";
import { BsImageFill } from "react-icons/bs"
import toast from "react-hot-toast";
import baseAPI from "../../Api/baseApi"
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Creator = () => {
  const [hamburger, setHamburger] = useState(0);
  const [selectedImage, setSelectedImage]= useState(null)
  const [title, setTitle]= useState("")
  const [content, setContent]= useState("")
  const auth = useSelector((state) => state.auth);
  const navigate= useNavigate()

  console.log("content", content&&content.getCurrentContent()?draftToHtml(convertToRaw(content.getCurrentContent())):"")



  const handlePublishButtonClick= async ()=>{
    if (!title){
      return
    }
    const formData = new FormData();
    formData.append("title", title)
    formData.append("content", draftToHtml(convertToRaw(content.getCurrentContent())))
    formData.append("draft", false)
    if (selectedImage){
        formData.append("picture", selectedImage)
    }

    let toastID= toast.loading("Publishing........", {position: "top-center", style: { color: "#0E4E48" }});
    try{
      await baseAPI.post("/blog/post/", formData, {headers: {"Authorization": `Bearer ${auth.token}`}});
      toast.dismiss(toastID)
      toast.success("Post successfully published")
      navigate("/home/post")
    }
    catch(err){
      toast.dismiss(toastID)
      toast.error("post not pubished")
    }
  }

  const handleSaveAsDraftButtonClick= async ()=>{
    if (!title){
        return
    }
    const formData = new FormData();
    formData.append("title", title)
    formData.append("content", draftToHtml(convertToRaw(content.getCurrentContent())))
    formData.append("draft", true)
    if (selectedImage){
        formData.append("picture", selectedImage)
    }

    let toastID= toast.loading("Saving post as draft.......", {position: "top-center", style: { color: "#0E4E48" }});
    try{
      await baseAPI.post("/blog/post/", formData, {headers: {"Authorization": `Bearer ${auth.token}`}});
      toast.dismiss(toastID)
      toast.success("Post successfully saved as draft")
      navigate("/home/post")
    }
    catch(err){
      toast.dismiss(toastID)
      toast.error("post not saved as draft")
    }
  }

  return (
    <div>
      <Navbar
        title="Create Post"
        hamburger={hamburger}
        setHamburger={setHamburger}
      />
        <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
        <div className={`${hamburger ? "blur-sm h-screen" : ""}`}>
        <div className="px-6 z-5 tablet:mb-[50px] mb-[95px] mt-[100px] h-full">
        {/* ---------page content begin------- */}
        {/* ---------post title begin----------- */}
          <div className="flex items-center shadow-[1px_-1px_21px_rgba(0,0,0,0.25)] mt-[15px] rounded-[25px] p-[6px] w-full">
              <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="w-full h-10 text-[15px] peer outline-none p-2" placeholder="Title"/>
          </div>
        {/* -------post title end----------- */}
        {/* -----------post content begin--------- */}
          <Editor toolbar={{options: ['blockType', 'fontSize', 'fontFamily', 'inline',  'list', 'image', 'textAlign',  'emoji', 'link', 'embedded', 'colorPicker', 'remove', 'history']}} editorState={content} toolbarClassName="!max-w-fit" wrapperClassName="shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] w-full mt-3 border" editorClassName="!h-[380px] px-3" onEditorStateChange={setContent} />
        {/* ---------post content end--------- */}
        {/* -------image and button start----- */}
        <div className="flex justify-between items-end mt-4">
            <div className="">
                <input className="hidden" onChange={(event)=>setSelectedImage(event.target.files[0])} type="file" accept="image/*" id="upload-button"/>
                <label htmlFor="upload-button" className="cursor-pointer"><BsImageFill className="text-[#0E4E48] text-[40px]"/></label>
            </div>
            <div className="flex">
                <div onClick={handleSaveAsDraftButtonClick} className="rounded-[15px] font-[roboto] bg-[#FF6666] text-[#fff] py-2 px-5 font-semibold text-[12px] cursor-pointer mr-1">
                 Save as Draft
                </div>
                <div onClick={handlePublishButtonClick} className="rounded-[15px] font-[roboto] bg-[#62C78A] text-[#fff] py-2 px-5 font-semibold text-[12px] cursor-pointer">
                 Publish
                </div>
            </div>
        </div>
        {/* -------image and button end----- */}
        <div className="">{selectedImage&&selectedImage.name? selectedImage.name:""}</div>
        {/* -------page content end------- */}
        </div>
        </div>
      </div>
      <FooterButton/>
    </div>
  );
};

export default Creator;

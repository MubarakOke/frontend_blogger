import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FetchPostAction  } from "../../Redux/actionCreators/postAction";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai"
import { HiArrowNarrowLeft } from "react-icons/hi"
import { FaSearch } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import FooterButton from "../../Components/footerbutton";
import DeleteModal from "../../Components/deleteModal";



const Blog = () => {
  const post = useSelector((state) => state.post);
  const [searchClicked, SetSearchclicked]= useState(false)
  const [searchText, SetSearchText]= useState("")
  const [modalOpen, setModalOpen] = React.useState(false)
  const [postID, setPostID] = React.useState("")
  const [debouncedSearchText, setDebouncedSearchText]= useState(searchText)
  const dispatch= useDispatch();
  const navigate= useNavigate()

  useEffect(()=>{
      dispatch(FetchPostAction())
  }, []);

  useEffect(() =>{
    const timerID= setTimeout(()=>{
      setDebouncedSearchText(searchText)
    }, 1000)

    return ()=>{clearTimeout(timerID)}
  }, [searchText])

  useEffect(()=>{
    if(debouncedSearchText){ dispatch(FetchPostAction(null, debouncedSearchText)) }
  }, [debouncedSearchText])

  const handleSearchCancel= ()=>{
    SetSearchclicked(false)
    dispatch(FetchPostAction())
    SetSearchText("")
    setDebouncedSearchText("")
  }

  const handleDeletIconClick=(postID)=>{
    setModalOpen(true)
    setPostID(postID)
  }

  const handleDraftIconClick= (postID, title, content, image)=>{
    navigate("/edit-post", {state:{postID, title, content, image}})
  }

  const fetchNextPost= (url)=>{
    dispatch(FetchPostAction(url))
  }

  const fetchPreviousPost= (url)=>{
    dispatch(FetchPostAction(url))
  }

  const reconstructDate= (date)=>{
    let newDate= new Date(date)
    const year= String(newDate.getFullYear()).slice(-2)
    const month= String(newDate.getMonth() + 1)
    const day= String(newDate.getDate())
    newDate= `${day}-${month}-${year}`
    return newDate
  }

  const renderList = () => {
    if (post && post.results){
      return post.results.map((post, index) => {
        return (
          <div class="table-row" key={index}>
          <div class="table-cell tablet:text-[20px] text-[17px] break-words pt-3">{reconstructDate(post.date)}</div>
          <div class="table-cell tablet:text-[20px] text-[17px] break-words pt-3 truncate">{post.title}</div>
          <div class="table-cell tablet:text-[20px] text-[17px] break-words pt-3">{post.draft?"draft":"published"}</div>
          <div class="table-cell tablet:text-[20px] text-[17px] break-words pt-3">
            <div className="relative bottom-[-4px]">
              <div className="flex items-end">
                <MdDelete onClick={()=>{handleDeletIconClick(post.id)}} className="text-[red] text-[23px] mr-3 cursor-pointer" />
                {post.draft? <AiFillEdit onClick={()=>{handleDraftIconClick(post.id, post.title, post.content, post.picture)}} className="text-[green] text-[23px] cursor-pointer" />:""}
              </div>
            </div>
          </div>
          </div> 
        )
      });
    }
    else{
      return ""
    }
  };

  return (
    <div className="">
    <div className="px-6 z-5 tablet:mb-[50px] mb-[95px] mt-[100px]">
    {/* ----------create post and search button start---------- */}
    <div className="flex justify-end items-center">
      <div autoFocus className={`${!searchClicked?"hidden":""} relative group w-[60%] mr-[7px]`}>
          <input
            onChange={(e)=>{ SetSearchText(e.target.value)}}
            value={searchText}
            type="text"
            id="text"
            placeholder="search......."
            required
            className="w-full tablet:!text-[15px] tablet:h-[40px] h-[35px] rounded-[10px] outline-none border-2 border-[#62C78A] p-2"
          />
        </div>
      {searchClicked?<ImCross onClick={handleSearchCancel}  className="mr-4 text-[19px] text-[red] cursor-pointer" />
                    :
                    <FaSearch onClick={()=>{SetSearchclicked(true)}} className="mr-4 text-[19px] cursor-pointer" />}
      <Link to="/create-post" className="laptop:w-[100px] w-[90px] laptop:h-[40px] h-[35px]  flex items-center justify-center p-2 bg-[#62C78A] text-[white] rounded-[29px] cursor-pointer">
        <BsFillPencilFill className="mr-[5px]" />create
      </Link>
    </div>
    {/* -----------create post and search button end------------ */}
    
    {/* -------------post table start------------- */}
    {<div className="mt-4 p-1 shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)]">
              <div class="table p-1 table-fixed w-full">
                <div class="table-header-group bg-[#D7EBE2]">
                    <div class="table-row">
                    <div class="table-cell tablet:text-[20px] font-bold text-[#0E4E48] text-[17px] pr-3">Date</div>
                    <div class="table-cell tablet:text-[20px] w-[31%] font-bold text-[#0E4E48] text-[17px] pr-3">Topic</div>
                    <div class="table-cell tablet:text-[20px] font-bold text-[#0E4E48] text-[17px] pr-3">Status</div>
                    <div class="table-cell tablet:text-[20px] font-bold text-[#0E4E48] text-[17px] pr-3">Action</div>
                    </div>
                </div>
                <div class="table-row-group">
                  {renderList()}
                </div> 
              </div>  
      </div>}
    {/* -------------post table ends---------- */}
    {/* -------------back and next button start---------- */}
    <div className="flex justify-end mt-6 z-40">
          {post && post.previous? 
            <div onClick={()=>{fetchPreviousPost(post.previous)}} className="flex items-center rounded-[6px] font-[roboto] bg-[#F9F9F9] text-[#8A8B8B] py-2 px-5 font-semibold text-[18px] cursor-pointer mr-4 hover:bg-[#565352] hover:text-[#fff]">
              <HiArrowNarrowLeft className="text-[18px]" />
              <span className="ml-2 text-[16px]">Back</span>
            </div>:""}
          {post && post.next? 
            <div onClick={()=>{fetchNextPost(post.next)}} className="rounded-[6px] font-[roboto] bg-[#0E4E48] text-[#fff] py-2 px-5 font-semibold text-[16px] cursor-pointer">
              Next
            </div>: ""}
      </div>
    {/* --------------back and next button stop---------- */}
    </div>
    <DeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} postID={postID} setPostID={setPostID}/>
    <FooterButton />
    </div>);
};

export default Blog;
 
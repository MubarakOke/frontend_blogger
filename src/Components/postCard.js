import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard= ({postID, image, title, content, date, comments})=> {
    const navigate= useNavigate()

  return (
    <div  className='shadow-[1px_-1px_21px_rgba(0,0,0,0.25)]'>
        {image? <img onClick={()=>{navigate(`/blog/${postID}`, {state:{postID, title, content, image, date, comments}})}} src={image} className="h-[110px] w-full cursor-pointer" />:""}
        <div onClick={()=>{navigate(`/blog/${postID}`, {state:{postID, title, content, image, date, comments}})}} className="font-[600] text-[18px] text-[#616262] p-3 mb-2 cursor-pointer hover:text-[red]">{title}</div>
    </div>
  )
}

export default PostCard
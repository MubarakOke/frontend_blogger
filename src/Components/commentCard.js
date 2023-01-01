import React from 'react';
import Avatar from "../Assets/image/Avatar.jpg";

const CommentCard= ({image, name, content, date})=> {
    const reconstructDate= (date)=>{
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
        let newDate= new Date(date)
        const year= String(newDate.getFullYear())
        const month= months[newDate.getMonth()]
        const day= String(newDate.getDate())
        newDate= `${month} ${day}, ${year}`
        return newDate
      }
    
  return (
    <div  className='shadow-[1px_-1px_21px_rgba(0,0,0,0.25)] p-3'>
        <div className="flex items-start">
            <img src={image? image:Avatar} alt="" className="laptop:h-[50px] border border-[grey] rounded-full laptop:w-[50px] h-[50px] w-[50px]" />
            <div className="ml-3">
                <div  className="text-sm text-[#616262]">{reconstructDate(date)}</div>
                <div  className="text-sm text-[#616262] mb-2">{name}</div>
                <div>
                    {content}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CommentCard
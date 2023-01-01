import React from 'react'

function DisplayError({message}) {
  return (
    <div className="relative group mt-3 border-2 flex border-rose-600 h-[50px] rounded justify-center items-center">
    <div className="text-rose-600">{message}</div>     
    </div>
  )
}

export default DisplayError
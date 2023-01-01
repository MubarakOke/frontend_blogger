import React from "react";
import Wall from "../Assets/image/wall.png";

const OrderPreviewEmpty = ({title1, title2}) => {
  return (
    <div className="flex flex-col justify-center my-auto items-center h-full mt-24">
      <div className="laptop:h-[330px] laptop:w-[330px] tablet:h-[280px] table:w-[280px]" >
      <img src={Wall} alt="wall" className="laptop:h-full laptop:w-full tablet:h-full tablet:h-full" />
      </div>
      <div className="flex flex-col mt-6 mb-12 text-[#AAAAAA] laptop:text-[25px] tablet:text-[22px] text-[21px] items-center font-bold">
        <span>{title1}</span>
        <span>{title2}</span>
      </div>
    </div>
  );
};

export default OrderPreviewEmpty;

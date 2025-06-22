import React from "react";

const Title = ({title1, title2}) => {
  return (
    <div className="flexCol items-center">
      <p className="text-[15px] text-gray-500 font-medium">
        {title1}
      </p>
      <h1 className="text-[25px] sm:text-[35px] font-bold">{title2}</h1>
    </div>
  );
};

export default Title;

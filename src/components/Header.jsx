import React from "react";
import { FaRocketchat } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" absolute top-0 w-full h-[80px] flex items-center justify-between p-5 md:px-10 text-[#25D366]">
      <Link to={'/'} className="flex gap-1 items-center">
        <FaRocketchat className=" text-[30px]" />
        <p className="text-[28px] font-semibold pb-1">Ownchat</p>
      </Link>
    </div>
  );
};

export default Header;

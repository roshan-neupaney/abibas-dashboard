import React from "react";
import Image from "next/image";
import SawariIcon from "../../../../../public/icons/Group.svg";
import MenuLink from "./menuLink/menuLink";

const Sidebar = () => {
  return (
    <div className='flex flex-col flex-1 h-full bg-[#202529] '>
      <div className='flex w-full h-14 py-4 px-5 border-b border-[#2e3132] '>
        <Image src={SawariIcon} width={98} height={24} alt="" />
      </div>
        <MenuLink />
    </div>
  );
};

export default Sidebar;

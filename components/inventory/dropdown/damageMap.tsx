import Image from "next/image";
import arrow from "../../../public/icons/arrow-right.svg";
import { useState } from "react";
import CarSvg from "../../carSvg";

const DamageMap = ({ vehicleDamage }: any) => {
  const [open, toggleOpen] = useState(false);

  return (
    <div className="detail-dropdown-box">
      <div className="detail-dropdown-header" onClick={() => toggleOpen(!open)}>
        <div className="flex-1 headline-small-NH color-black">Damage Map</div>
        <span>
          <Image
            className={`${
              open ? "-rotate-90" : "rotate-90"
            } transition-all duration-300`}
            src={arrow}
            width={24}
            height={24}
            alt=""
          />{" "}
        </span>
      </div>
      <div
        className={`flex self-stretch ${
          open ? "border-b border-[#d8dadb]" : "border-b-0 duration-500"
        } `}
      ></div>
      <div className="w-full">
        <div
          className={`${
            open ? "show-dropdown" : "hide-dropdown"
          } detail-dropdown-body max-h-[56rem]`}
        >
          <div className="flex flex-col w-full">
            <CarSvg vehicleDamage={vehicleDamage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamageMap;

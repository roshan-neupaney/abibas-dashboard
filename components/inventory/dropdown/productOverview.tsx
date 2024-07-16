import Image from "next/image";
import arrow from "../../../public/icons/arrow-right.svg";
import { useState } from "react";
import { FormatDistance } from "../../../utilities/helper";

const ProductOverview = ({ vehicle_detail }: any) => {
  const [open, toggleOpen] = useState(true);
  return (
    <>
      <div className="detail-dropdown-box">
        <div
          className="detail-dropdown-header"
          onClick={() => toggleOpen(!open)}
        >
          <div className="flex-1 headline-small-NH color-black">
            Product Overview
          </div>
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
            open ? "border-b border-[#d8dadb] " : "border-b-0 duration-300"
          }`}
        ></div>
        <div className="w-full">
          <div
            className={`${
              open ? "show-dropdown" : "hide-dropdown"
            } detail-dropdown-body max-h-[30rem]`}
          >
            <div className="grid grid-cols-3 gap-10 p-4 w-full">
              {vehicle_detail?.enum_made_year && (
                <div className="flex flex-col gap-1">
                  <span
                    className="body-medium"
                    style={{ color: "#45474A !important" }}
                  >
                    Make Year
                  </span>
                  <span className="title-medium-NH font-bold">
                    {vehicle_detail?.enum_made_year.title}
                  </span>
                </div>
              )}
              {vehicle_detail?.registration_year && (
                <div className="flex flex-col gap-1">
                  <span
                    className="body-medium"
                    style={{ color: "#45474A !important" }}
                  >
                    Registration Year
                  </span>
                  <span className="title-medium-NH font-bold">
                    {vehicle_detail?.registration_year}
                  </span>
                </div>
              )}
              {vehicle_detail?.variant.fuel_type && (
                <div className="flex flex-col gap-1">
                  <span
                    className="body-medium"
                    style={{ color: "#45474A !important" }}
                  >
                    Fuel Type
                  </span>
                  <span className="title-medium-NH font-bold">
                    {vehicle_detail?.variant.fuel_type}
                  </span>
                </div>
              )}
              {vehicle_detail?.km_run && (
                <div className="flex flex-col gap-1">
                  <span
                    className="body-medium"
                    style={{ color: "#45474A !important" }}
                  >
                    Km Driven
                  </span>
                  <span className="title-medium-NH font-bold">
                    {FormatDistance(vehicle_detail?.km_run)} km
                  </span>
                </div>
              )}
              {vehicle_detail?.variant?.transmission && (
                <div className="flex flex-col gap-1">
                  <span
                    className="body-medium"
                    style={{ color: "#45474A !important" }}
                  >
                    Transmission
                  </span>
                  <span className="title-medium-NH font-bold">
                    {vehicle_detail?.variant?.transmission}
                  </span>
                </div>
              )}
              {vehicle_detail?.enum_owner && (
                <div className="flex flex-col gap-1">
                  <span
                    className="body-medium"
                    style={{ color: "#45474A !important" }}
                  >
                    No. of Owner
                  </span>
                  <span className="title-medium-NH font-bold">
                    {vehicle_detail?.enum_owner.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOverview;

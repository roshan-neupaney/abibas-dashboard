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
            Product OverView
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
          className={`${
            open ? "show-dropdown" : "hide-dropdown"
          } detail-dropdown-body`}
        >
          <div className="grid grid-cols-3 gap-10 p-4 w-full">
            {vehicle_detail?.enum_made_year && (
              <div className="flex flex-col gap-1">
                <span className="body-medium" style={{ color: "#45474A !important" }}>Make Year</span>
                <span className="title-medium-NH font-bold">
                  {vehicle_detail?.enum_made_year.title}
                </span>
              </div>
            )}
            {vehicle_detail?.registration_year && (
              <div className="flex flex-col gap-1">
                <span className="body-medium" style={{ color: "#45474A !important" }}>Registration Year</span>
                <span className="title-medium-NH font-bold">
                  {vehicle_detail?.registration_year}
                </span>
              </div>
            )}
            {vehicle_detail?.variant.fuel_type && (
              <div className="flex flex-col gap-1">
                <span className="body-medium" style={{ color: "#45474A !important" }}>Fuel Type</span>
                <span className="title-medium-NH font-bold">
                  {vehicle_detail?.variant.fuel_type}
                </span>
              </div>
            )}
            {vehicle_detail?.km_run && (
              <div className="flex flex-col gap-1">
                <span className="body-medium" style={{ color: "#45474A !important" }}>Km Driven</span>
                <span className="title-medium-NH font-bold">
                  {FormatDistance(vehicle_detail?.km_run)} km
                </span>
              </div>
            )}
            {vehicle_detail?.variant?.transmission && (
              <div className="flex flex-col gap-1">
                <span className="body-medium" style={{ color: "#45474A !important" }}>Transmission</span>
                <span className="title-medium-NH font-bold">
                  {vehicle_detail?.variant?.transmission}
                </span>
              </div>
            )}
            {vehicle_detail?.enum_owner && (
              <div className="flex flex-col gap-1">
                <span className="body-medium" style={{ color: "#45474A !important" }}>No. of Owner</span>
                <span className="title-medium-NH font-bold">
                  {vehicle_detail?.enum_owner.title}
                </span>
              </div>
            )}
          </div>
          {/* <div>
            <div className="flex w-56 py-2 items-center gap-5">
              <div
                className="text-left label-large-NH w-28"
                style={{ color: "#45474A !important" }}
              >
                Fuel Type
              </div>
              <div className="flex-1 text-left label-large-NH">Petrol</div>
            </div>
            <div className="flex w-64 py-2 items-center gap-5">
              <div
                className="text-left label-large-NH w-28"
                style={{ color: "#45474A !important" }}
              >
                Displacement
              </div>
              <div className="flex-1 text-left label-large-NH">1997</div>
            </div>
            <div className="flex w-64 py-2 items-center gap-5">
              <div
                className="text-left label-large-NH w-28"
                style={{ color: "#45474A !important" }}
              >
                Engine
              </div>
              <div className="flex-1 text-left label-large-NH">Auto</div>
            </div>
            <div className="flex w-64 py-2 items-center gap-5">
              <div
                className=" text-left label-large-NH w-28"
                style={{ color: "#45474A !important" }}
              >
                Suspension & Brakes
              </div>
              <div className="flex-1 text-left label-large-NH">
                Front Suspension
              </div>
            </div>
            <div className="flex w-64 py-2 items-center gap-5">
              <div
                className="text-left label-large-NH w-28"
                style={{ color: "#45474A !important" }}
              >
                Max Power
              </div>
              <div className="flex-1 text-left label-large-NH">183 BPH</div>
            </div>
            <div className="flex w-64 py-2 items-center gap-5">
              <div
                className="text-left label-large-NH w-28"
                style={{ color: "#45474A !important" }}
              >
                Max Torque
              </div>
              <div className="flex-1 text-left label-large-NH">2750 RPM</div>
            </div>
            <div className="flex w-64 py-2 items-center gap-5">
              <div
                className="text-left label-large-NH w-28"
                style={{ color: "#45474A !important" }}
              >
                No. of Cylinder
              </div>
              <div className="flex-1 text-left label-large-NH">4</div>
            </div>
            <div className="flex w-64 py-2 items-center gap-5">
              <div
                className="text-left label-large-NH w-28"
                style={{ color: "#45474A !important" }}
              >
                Fuel Supply System
              </div>
              <div className="flex-1 text-left label-large-NH">CRDi</div>
            </div>
            <div className="flex w-64 py-2 items-center gap-5">
              <div
                className=" text-left label-large-NH w-28"
                style={{ color: "#45474A !important" }}
              >
                Fuel Supply System
              </div>
              <div className="flex-1 text-left label-large-NH">8 Speed</div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductOverview;

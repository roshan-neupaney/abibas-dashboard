import Image from "next/image";
import arrow from "../../../public/icons/arrow-right.svg";
import { useState } from "react";

const ProductOverview = () => {
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
          <div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOverview;

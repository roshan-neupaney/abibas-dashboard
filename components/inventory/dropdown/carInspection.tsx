import Image from "next/image";
import arrow from "../../../public/icons/arrow-right.svg";
import { useState } from "react";
import { groupBy } from "../../../utilities/helper";
import Check from "../../../public/icons/check-circle-solid.svg";
import ErrorIcon from "../../../public/icons/error.svg";
import FixIcon from "../../../public/icons/fix.svg";
import LazyImage from "../../lazyImage";
import { IMAGE_URL } from "../../../config/constants";

const CarInspection = ({ vehicleInspection }: any) => {
  const [open, toggleOpen] = useState(false);
  const groupedInspections = groupBy(
    vehicleInspection,
    (items: any) => items?.inspection?.inspectionCategory?.title
  );
  const mappedInspection = Object.entries(groupedInspections).map(
    ([key, value]) => {
      return { category: key, value: value };
    }
  );
  return (
    <div className="detail-dropdown-box">
      <div className="detail-dropdown-header" onClick={() => toggleOpen(!open)}>
        <div className="flex-1 headline-small-NH color-black">
          Car Inspections
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
          open ? "border-b border-[#d8dadb]" : "border-b-0 duration-300"
        } `}
      ></div>
      <div className="w-full">
        <div
          className={`${
            open ? "show-dropdown" : "hide-dropdown"
          } detail-dropdown-body max-h-[30rem]`}
        >
          <div className="flex flex-col p-4 gap-6 w-full">
            {mappedInspection?.map((elements: any, index: number) => {
              return (
                <div
                  className="flex flex-col gap-2 w-full border-b last:border-b-0"
                  key={index}
                >
                  <span className="title-large-NH">{elements?.category}</span>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 w-full pt-3 pb-6 px-5">
                    {elements?.value?.map((spec: any, i: number) => {
                      return (
                        <div className="flex gap-3 items-center w-64" key={i}>
                          <span
                            className="title-medium"
                            style={{ color: "#45474A !important" }}
                          >
                            {spec?.inspection?.title}
                          </span>
                          <div className="flex gap-1">
                            {spec?.value.includes("pass") && (
                              <span>
                                <Image
                                  src={Check}
                                  width={16}
                                  height={16}
                                  alt=""
                                />
                              </span>
                            )}
                            {spec?.value.includes("fix") && (
                              <span>
                                <Image
                                  src={FixIcon}
                                  width={16}
                                  height={16}
                                  alt=""
                                />
                              </span>
                            )}
                            {spec?.value.includes("fail") && (
                              <span>
                                <Image
                                  src={ErrorIcon}
                                  width={16}
                                  height={16}
                                  alt=""
                                />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInspection;

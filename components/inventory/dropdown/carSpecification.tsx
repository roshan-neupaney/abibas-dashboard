import Image from "next/image";
import arrow from "../../../public/icons/arrow-right.svg";
import { useState } from "react";
import { groupBy } from "../../../utilities/helper";
import LazyImage from "../../lazyImage";
import { IMAGE_URL } from "../../../config/constants";

const CarSpecification = ({ vehicleSpecification }: any) => {
  const [open, toggleOpen] = useState(false);
  const groupedSpecification = groupBy(
    vehicleSpecification,
    (items: any) => items?.specification?.specificationCategory?.title
  );
  const mappedSpecification = Object.entries(groupedSpecification).map(
    ([key, value]) => {
      return { category: key, value: value };
    }
  );

  return (
    <div className="detail-dropdown-box">
      <div className="detail-dropdown-header" onClick={() => toggleOpen(!open)}>
        <div className="flex-1 headline-small-NH color-black">
          Car Specifications
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
            {mappedSpecification?.map((elements: any, index: number) => {
              return (
                <div
                  className="flex flex-col gap-2 w-full border-b last:border-b-0"
                  key={index}
                >
                  <span className="title-large-NH">{elements?.category}</span>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 w-full pt-3 pb-6 px-5">
                    {elements?.value?.map((spec: any, i: number) => {
                      return (
                        <div className="flex items-center gap-4" key={i}>
                          <span>
                            <LazyImage
                              src={
                                IMAGE_URL +
                                "/small-" +
                                spec?.specification?.image
                              }
                              width={40}
                              height={40}
                              alt=""
                              className="rounded"
                            />
                          </span>
                          <div className="flex flex-col gap-1">
                            <span
                              className="body-medium"
                              style={{ color: "#45474A !important" }}
                            >
                              {spec?.specification?.title}
                            </span>
                            <span className="title-medium-NH font-bold">
                              {spec?.value}
                            </span>
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

export default CarSpecification;

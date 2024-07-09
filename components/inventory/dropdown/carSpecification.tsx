import Image from "next/image";
import arrow from "../../../public/icons/arrow-right.svg";
import { useState } from "react";
import { groupBy } from "../../../utilities/helper";

const CarSpecification = ({ vehicleSpecification }: any) => {
  const [open, toggleOpen] = useState(true);
  const groupedSpecification = groupBy(
    vehicleSpecification,
    (items: any) => items?.specification?.specificationCategory?.title
  );
  const mappedSpecification = Object.entries(groupedSpecification).map(
    ([key, value]) => {
      return { category: key, value: value };
    }
  );
  console.log("groupedSpecification", mappedSpecification);
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
      <div className="py-4 w-full">
        <div
          className={`${
            open ? "show-dropdown" : "hide-dropdown"
          } detail-dropdown-body`}
        >
          <div className="flex flex-col p-4 gap-6 w-full">
            {mappedSpecification.map((elements: any) => {
              return (
                <div className="flex flex-col gap-2 w-full">
                  <span className="title-large-NH">{elements?.category}</span>
                  <div className="grid grid-cols-3 gap-5 w-full border-b py-3 px-5">
                    {elements?.value.map((spec: any) => {
                      return (
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

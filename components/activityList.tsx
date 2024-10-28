import Image from "next/image";
import React, { useState } from "react";
import calenderIcon from "../public/icons/calendar.svg";
import arrowIcon from "../public/icons/caret-down.svg";

const ActivityList = () => {
  const [openDropdown, toggleDropdown] = useState<number | null>(0);
  const data = [
    { title: 1 },
    { title: 2 },
    { title: 2 },
    { title: 2 },
  ];

  return (
    <>
      <div className="flex flex-1 self-stretch flex-col p-5 border border-[#DFE2E7] rounded cursor-pointer">
        {data?.map((items, index) => {
          return (
            <>
              <div
                className="flex gap-5 self-stretch pt-4"
                key={index}
                onClick={() => toggleDropdown(openDropdown === index ? null: index)}
              >
                <span>
                  <Image src={calenderIcon} height={24} width={24} alt="" />
                </span>
                <div className="flex w-64 justify-between items-center self-stretch">
                  <span className="title-medium-NH">
                    25 Oct, 2023 {items.title}
                  </span>
                  <span>
                    <Image
                      src={arrowIcon}
                      height={20}
                      width={20}
                      alt=""
                      className={`${
                        openDropdown === index ? "rotate-180" : "rotate-0"
                      } transition-all duration-300`}
                    />
                  </span>
                </div>
              </div>
              <div
                className={`flex gap-5 border-l ml-3 flex-col overflow-auto ${
                  openDropdown === index
                    ? "show-activity-dropdown"
                    : "hide-activity-dropdown"
                }`}
              >
                <div className="flex flex-col self-stretch flex-1 mt-6 ml-8">
                  <div className="flex flex-col ">
                    <span className="body-small-NH">02:09 PM</span>
                    <span className="title-medium-NH">
                      Somebody updated Something.
                    </span>
                    <div className="mt-1">
                      <div className="flex">
                        <div className="label-large-NH w-28">Property Id</div>
                        <span className="label-large-NH">#09368</span>
                      </div>
                      <div className="flex">
                        <span className="label-large-NH w-28">Channel</span>
                        <span className="label-large-NH">App</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col self-stretch flex-1 mt-6 ml-8">
                  <div className="flex flex-col ">
                    <span className="body-small-NH">02:09 PM</span>
                    <span className="title-medium-NH">
                      Contacted Pratik Yadav.
                    </span>
                    <div className="mt-1">
                      <div className="flex">
                        <div className="label-large-NH w-28">Property Id</div>
                        <span className="label-large-NH">#09368</span>
                      </div>
                      <div className="flex">
                        <span className="label-large-NH w-28">
                          Contact Type
                        </span>
                        <span className="label-large-NH">Follow Up</span>
                      </div>
                      <div className="flex">
                        <span className="label-large-NH w-28">Medium</span>
                        <span className="label-large-NH">Outbound call</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col self-stretch flex-1 mt-6 ml-8">
                  <div className="flex flex-col ">
                    <span className="body-small-NH">02:09 PM</span>
                    <span className="title-medium-NH">
                      Added project Future Apartments.
                    </span>
                    <div className="mt-1">
                      <div className="flex">
                        <div className="label-large-NH w-28">Property Id</div>
                        <span className="label-large-NH">#09368</span>
                      </div>
                      <div className="flex">
                        <span className="label-large-NH w-28">Channel</span>
                        <span className="label-large-NH">App</span>
                      </div>
                      <div className="flex">
                        <span className="label-large-NH w-28">Developer</span>
                        <span className="label-large-NH">
                          Future Developers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col self-stretch flex-1 mt-6 ml-8">
                  <div className="flex flex-col ">
                    <span className="body-small-NH">02:09 PM</span>
                    <span className="title-medium-NH">
                      Added project Future Apartments.
                    </span>
                    <div className="mt-1">
                      <div className="flex">
                        <div className="label-large-NH w-28">Property Id</div>
                        <span className="label-large-NH">#09368</span>
                      </div>
                      <div className="flex">
                        <span className="label-large-NH w-28">Channel</span>
                        <span className="label-large-NH">App</span>
                      </div>
                      <div className="flex">
                        <span className="label-large-NH w-28">Developer</span>
                        <span className="label-large-NH">
                          Future Developers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ActivityList;

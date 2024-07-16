"use client";

import { useState } from "react";
import VehicleExterior360View from "./section/exterior360view";
import VehicleInterior360View from "./section/interior360view";

const Vehicle360View = ({ ExtImages360, IntImages360 }: any) => {
  const [viewType, setViewType] = useState<string>("ext");
  return (
    <>
      <div className="relative w-full">
        <div
          className={`title-medium absolute z-10 bottom-[5%] lg:left-1/3 left-1/4 py-2 px-4  rounded-xl cursor-pointer ${
            viewType === "ext" ? "bg-[#10a9e650]" : "bg-[#20252950]"
          }`}
          onClick={() => setViewType("ext")}
        >
          <label className="text-white">Exterior</label>
        </div>
        <div
          className={`title-medium absolute z-10 bottom-[5%] lg:right-1/3 right-1/4 py-2 px-4  rounded-xl cursor-pointer ${
            viewType === "int" ? "bg-[#10a9e650]" : "bg-[#20252950]"
          }`}
          onClick={() => setViewType("int")}
        >
          <label className="text-white">Interior</label>
        </div>
        {viewType === "ext" ? (
          <VehicleExterior360View {...{ ExtImages360 }} />
        ) : (
          <VehicleInterior360View IntImages360={IntImages360} />
        )}
      </div>
    </>
  );
};

export default Vehicle360View;

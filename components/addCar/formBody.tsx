"use client";
import { useState } from "react";
import General from "./general";

const FormBody = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col">
      <div className="flex px-4" style={{ borderBottom: "1px solid #D8DADB" }}>
        <div className="flex gap-4 h-12">
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 0 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(0)}
          >
            General
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 1 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(1)}
          >
            Main Features
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 2 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(2)}
          >
            Specifications
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 3 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(3)}
          >
            Inspection Report
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 4 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(4)}
          >
            Addons
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 5 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(5)}
          >
            Pricing
          </div>
        </div>
      </div>
          <General />
      
    </div>
  );
};

export default FormBody;

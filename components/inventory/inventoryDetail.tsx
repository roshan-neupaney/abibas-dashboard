"use client";
import React, { useState } from "react";
import Overview from "./overView";
import Insights from "./insights";
import Offers from "./offers";
import TestDrives from "./testDrives";

const InventoryDetail = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="flex col">
      <div className="flex px-4" style={{ borderBottom: "1px solid #D8DADB" }}>
        <div className="flex gap-4 h-12">
          <div
            className={`nav-tabs flex align-center pointer ${
              active == 0 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(0)}
          >
            Overview
          </div>
          <div
            className={`nav-tabs flex align-center pointer ${
              active == 1 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(1)}
          >
            Insights
          </div>
          <div
            className={`nav-tabs flex align-center pointer ${
              active == 2 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(2)}
          >
            Offers
          </div>
          <div
            className={`nav-tabs flex align-center pointer ${
              active == 3 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(3)}
          >
            Test Drives
          </div>
        </div>
      </div>
      {active === 0 ? (
        <Overview />
      ) : active === 1 ? (
        <Insights />
      ) : active === 2 ? (
        <Offers />
      ) : (
        <TestDrives />
      )}
    </div>
  );
};

export default InventoryDetail;

"use client";
import React, { useState } from "react";
import Overview from "./overview";
import Orders from "./orders";
import Activity from "./activitiy";

const AgentDetail = () => {
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
            Overview
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 1 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(1)}
          >
            Orders
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 2 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(2)}
          >
            Activity
          </div>
        </div>
      </div>
      {active === 0 ? (
        <Overview {...{setActive}} />
      ) : active === 1 ? (
        <Orders />
      ) : (
        <Activity />
      )}
    </div>
  );
};

export default AgentDetail;

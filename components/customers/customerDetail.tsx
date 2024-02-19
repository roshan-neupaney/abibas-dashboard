"use client";

import { useState } from "react";
import Activity from "./activity";
import Overview from "./overview";

const CustomerDetail = () => {
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
        </div>
      </div>
      {active === 0 ? <Overview /> : <Activity />}
    </div>
  );
};

export default CustomerDetail;

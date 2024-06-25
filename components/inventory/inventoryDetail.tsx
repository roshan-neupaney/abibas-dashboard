"use client";
import React, { useState } from "react";
import Overview from "./overView";
import Insights from "./insights";
import Offers from "./offers";
import TestDrives from "./testDrives";
import InventoryWatchList from "./watchList";
import InventoryBookings from "./bookings";

interface typeInventoryDetail {
  watchList: any;
  bookingList: any;
  testDriveList: any;
  offerList: any;
  token: string;
  id: string;
}

const InventoryDetail = ({
  watchList,
  bookingList,
  testDriveList,
  offerList,
  token,
  id,
}: typeInventoryDetail) => {
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
            Insights
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 2 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(2)}
          >
            Watchlist
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 3 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(3)}
          >
            Booking
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 4 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(4)}
          >
            Offers
          </div>
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 5 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(5)}
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
        <InventoryWatchList {...{ watchList, token }} />
      ) : active === 3 ? (
        <InventoryBookings {...{ bookingList, token }} />
      ) : active === 4 ? (
        <Offers {...{ offerList, token }} />
      ) : (
        <TestDrives {...{ testDriveList, token }} />
      )}
    </div>
  );
};

export default InventoryDetail;

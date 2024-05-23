import React from "react";
import car from "../../public/images/creta.png";
import LazyImage from "../lazyImage";

const Overview = () => {
  return (
    <div className="" style={{flex: 0.8}}>
    <div className="overview-container sticky top-3" >
      <div className="flex flex-col items-center gap-6 ">
        <LazyImage src={car} alt="car" width={460} height={345} />
        <div className="flex flex-col w-full">
          <label className="title-medium">All New Hyundai Creta - 2021</label>
          <div
            className="flex flex-1 py-3 gap-5 self-stretch"
            style={{ borderBottom: "1px solid #D8DADB" }}
          >
            <span className="label-large flex-1">Fuel Type</span>
            <span className="body-medium flex-1">Petrol</span>
          </div>
          <div
            className="flex flex-1 py-3 gap-5 self-stretch"
            style={{ borderBottom: "1px solid #D8DADB" }}
          >
            <span className="label-large flex-1">Displacement</span>
            <span className="body-medium flex-1">1997</span>
          </div>
          <div
            className="flex flex-1 py-3 gap-5 self-stretch"
            style={{ borderBottom: "1px solid #D8DADB" }}
          >
            <span className="label-large flex-1">Engine</span>
            <span className="body-medium flex-1">Content Value</span>
          </div>
          <div
            className="flex flex-1 py-3 gap-5 self-stretch"
            style={{ borderBottom: "1px solid #D8DADB" }}
          >
            <span className="label-large flex-1">Suspense & Brakes</span>
            <span className="body-medium flex-1">Front Suspension</span>
          </div>
          <div
            className="flex flex-1 py-3 gap-5 self-stretch"
            style={{ borderBottom: "1px solid #D8DADB" }}
          >
            <span className="label-large flex-1">Max Power</span>
            <span className="body-medium flex-1">183 BPH</span>
          </div>
          <div
            className="flex flex-1 py-3 gap-5 self-stretch"
            style={{ borderBottom: "1px solid #D8DADB" }}
          >
            <span className="label-large flex-1">Max Torque</span>
            <span className="body-medium flex-1">2750 RPM</span>
          </div>
          <div
            className="flex flex-1 py-3 gap-5 self-stretch"
            style={{ borderBottom: "1px solid #D8DADB" }}
          >
            <span className="label-large flex-1">No. of Cylinder</span>
            <span className="body-medium flex-1">4</span>
          </div>
          <div
            className="flex flex-1 py-3 gap-5 self-stretch"
            style={{ borderBottom: "1px solid #D8DADB" }}
          >
            <span className="label-large flex-1">Fuel Supply System</span>
            <span className="body-medium flex-1">CRDi</span>
          </div>
          <div
            className="flex flex-1 py-3 gap-5 self-stretch"
            style={{ borderBottom: "1px solid #D8DADB" }}
          >
            <span className="label-large flex-1">Gear Box</span>
            <span className="body-medium flex-1">8 Speed</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Overview;

import React from "react";

const OwnerDetailSection = () => {
  return (
    <div className="booking-section p-6 flex-col">
      <div className="flex pb-6 gap-2 items-center">
        <label className="headline-medium-NH">Owner Details</label>
      </div>
      <div className="flex py-2 flex-1 body-medium" style={{color: '#1A1C1E'}}>
        <div className="flex w-32">Name</div>
        <span>Andy Morano</span>
      </div>
      <div className="flex py-2 flex-1 body-medium">
        <div className="flex w-32">Phone Number</div>
        <span>9812345678</span>
      </div>
      <div className="flex py-2 flex-1 body-medium">
        <div className="flex w-32">Email Address</div>
        <span>andymorano@gmail.com</span>
      </div>
      <div className="flex py-2 flex-1 body-medium">
        <div className="flex w-32">Address</div>
        <span>Durbar Road, Kathmandu, Bagmati</span>
      </div>
    </div>
  );
};

export default OwnerDetailSection;

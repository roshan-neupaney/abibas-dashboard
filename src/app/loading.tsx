import React from "react";
import { CircularLoader } from "../../components/loader/loader";
import CarLoader from "../../components/loader/carLoader";

const Loading = () => {
  return (
    <div className="flex flex-col gap-5 bg-[#fcfcfc] w-full h-screen">
      <CarLoader />
    </div>
  );
};

export default Loading;

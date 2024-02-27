import React from "react";
import { CircularLoader } from "../../components/loader/loader";

const Loading = () => {
  return (
    <div className="flex col gap-5 bg-[#fcfcfc] w-full h-screen">
      <CircularLoader />
    </div>
  );
};

export default Loading;

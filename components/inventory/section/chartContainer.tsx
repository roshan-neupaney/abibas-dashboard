import React from "react";
import MultiLineChart from "../../charts/multilineChart";

const ChartContainer = () => {
  return (
    <div className="chart-container">
      <div className="flex pb-5 items-start flex-col gap-0.5 flex-1">
        <div className="flex flex-1 gap-2">
          <span className="headline-small-NH" style={{color: '#1A1C1E'}}>Reach & Interaction</span>
        </div>
        <p className="body-medium-NH">
          A line chart that shows sale and rent activity
        </p>
        </div>
        <div className="flex self-stretch h-[25rem] w-auto">
          <MultiLineChart data={''} />
      </div>
    </div>
  );
};

export default ChartContainer;

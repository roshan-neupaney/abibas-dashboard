import React from "react";

const DashboardCounts = () => {
  return (
    <div className="flex items-start gap-5 self-stretch">
      <div className="flex-1 flex-col px-4 py-3 insight-count-box">
        <div className="label-large-NH" style={{ color: "#45474A !important" }}>
          Offers
        </div>
        <div className="count-label">6</div>
      </div>
      <div className="flex-1 flex-col px-4 py-3 insight-count-box">
        <div className="label-large-NH" style={{ color: "#45474A !important" }}>
          Test Drive Requests
        </div>
        <div className="count-label">15</div>
      </div>
      <div className="flex-1 flex-col px-4 py-3 insight-count-box">
        <div className="label-large-NH" style={{ color: "#45474A !important" }}>
          Shares
        </div>
        <div className="count-label">11</div>
      </div>
      <div className="flex-1 flex-col px-4 py-3 insight-count-box">
        <div className="label-large-NH" style={{ color: "#45474A !important" }}>
          Favorites
        </div>
        <div className="count-label">2.8 K</div>
      </div>
    </div>
  );
};

export default DashboardCounts;

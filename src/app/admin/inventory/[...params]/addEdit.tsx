"use client";
import { useState } from "react";
import General from "../../../../../components/addCar/general";
import ColorVariationImages from "../../../../../components/addCar/images";

interface VehicleProps {
  isEdit: boolean;
  token: string;
  _id: string;
  shoe: any;
  shoe_category: any;
  shoe_brand: any;
  color: any;
}

const AddEditVehicle = ({
  isEdit,
  token,
  _id,
  shoe,
  shoe_category,
  shoe_brand,
  color,
}: VehicleProps) => {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col">
      <div className="flex px-4" style={{ borderBottom: "1px solid #D8DADB" }}>
        <div className="flex">
          <div
            className={`nav-tabs flex items-center cursor-pointer ${
              active == 0 ? "active-navTab" : "inactive-navTab"
            }`}
            onClick={() => setActive(0)}
          >
            General
          </div>
          {isEdit && (
            <>
              <div
                className={`nav-tabs flex items-center cursor-pointer ${
                  active == 1 ? "active-navTab" : "inactive-navTab"
                }`}
                onClick={() => setActive(1)}
              >
                Images
              </div>
            </>
          )}
        </div>
      </div>
      {active === 0 ? (
        <General
          {...{ shoe, shoe_category, shoe_brand, isEdit, token, _id, color }}
        />
      ) : (
        active === 1 && (
          <ColorVariationImages
            {...{ isEdit, token, _id }}
            color_variation={shoe?.data?.colorVariation}
          />
        )
      )}
    </div>
  );
};

export default AddEditVehicle;

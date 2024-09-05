"use client";
import { useState } from "react";
import General from "../../../../../components/addCar/general";
import VehicleImages from "../../../../../components/addCar/images";
import AddSpecifications from "../../../../../components/addCar/addSpecifications";
import AddFeatures from "../../../../../components/addCar/addFeatures";
import AddInspections from "../../../../../components/addCar/addInspections";
import Vehicle360Images from "../../../../../components/addCar/add360Image";
import Demo360Images from "../../../../../components/addCar/demo360Upload";
import VehicleInt360Images from "../../../../../components/addCar/addINT360Image";
import VehicleDamagedImages from "../../../../../components/addCar/addDamagePartImage";

interface VehicleProps {
  isEdit: boolean;
  token: string;
  id: string;
  shoe: any;
  shoe_category: any;
  shoe_brand: any;
}

const AddEditVehicle = ({
  isEdit,
  token,
  id,
  shoe,
  shoe_category,
  shoe_brand,
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

              <div
                className={`nav-tabs flex items-center cursor-pointer ${
                  active == 2 ? "active-navTab" : "inactive-navTab"
                }`}
                onClick={() => setActive(2)}
              >
                Specifications
              </div>
              <div
                className={`nav-tabs flex items-center cursor-pointer ${
                  active == 3 ? "active-navTab" : "inactive-navTab"
                }`}
                onClick={() => setActive(3)}
              >
                Features
              </div>
              <div
                className={`nav-tabs flex items-center cursor-pointer ${
                  active == 4 ? "active-navTab" : "inactive-navTab"
                }`}
                onClick={() => setActive(4)}
              >
                Inspections
              </div>
              <div
                className={`nav-tabs flex items-center cursor-pointer ${
                  active == 5 ? "active-navTab" : "inactive-navTab"
                }`}
                onClick={() => setActive(5)}
              >
                Exterior 360 Images
              </div>
              <div
                className={`nav-tabs flex items-center cursor-pointer ${
                  active == 6 ? "active-navTab" : "inactive-navTab"
                }`}
                onClick={() => setActive(6)}
              >
                Interior 360 Images
              </div>
              <div
                className={`nav-tabs flex items-center cursor-pointer ${
                  active == 7 ? "active-navTab" : "inactive-navTab"
                }`}
                onClick={() => setActive(7)}
              >
                Damaged Parts Images
              </div>
            </>
          )}
        </div>
      </div>
      <General {...{ shoe, shoe_category, shoe_brand, isEdit, token, id }} />
      {/* {active === 0 ? (
      ) : active === 1 ? (
        <VehicleImages {...{ isEdit, token, id, vechile_images }} />
      ) : active === 2 ? (
        <AddSpecifications
          {...{
            variant_specification,
            token,
            isEdit,
            id,
            vehicle_specification,
          }}
        />
      ) : active === 3 ? (
        <AddFeatures
          {...{ variant_feature, token, isEdit, id, vehicle_features }}
        />
      ) : active === 4 ? (
        <AddInspections
          {...{ variant_inspection, token, isEdit, id, vehicle_inspection }}
        />
      ) : active === 5 ? (
        <Vehicle360Images {...{ isEdit, token, id, vehicle_ext_360_images }} />
      ) : active === 6 ? (
        <VehicleInt360Images
          {...{ isEdit, token, id, vehicle_int_360_images }}
        />
      ) : (
        <VehicleDamagedImages
          {...{ isEdit, token, id, vehicle_int_360_images, vehicle_body_part, vehicle_scratch }}
        />
      )} */}
    </div>
  );
};

export default AddEditVehicle;

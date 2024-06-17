"use client";
import { useState } from "react";
import General from "../../../../../components/addCar/general";
import VehicleImages from "../../../../../components/addCar/images";
import AddSpecifications from "../../../../../components/addCar/addSpecifications";
import AddFeatures from "../../../../../components/addCar/addFeatures";
import AddInspections from "../../../../../components/addCar/addInspections";

interface VehicleProps {
  isEdit: boolean;
  token: string;
  id: string;
  vehicle: any;
  vehicle_enum: any;
  variant_specification: any;
  variant_feature: any;
  variant_inspection: any;
  vechile_images: any;
  vehicle_specification: any;
  vehicle_features: any;
  vehicle_inspection: any;
}

const AddEditVehicle = ({
  isEdit,
  token,
  id,
  vehicle,
  vehicle_enum,
  variant_specification,
  variant_feature,
  variant_inspection,
  vechile_images,
  vehicle_specification,
  vehicle_features,
  vehicle_inspection,
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
            </>
          )}
        </div>
      </div>
      {active === 0 ? (
        <General {...{ vehicle, vehicle_enum, isEdit, token, id }} />
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
      ) : (
        <AddInspections
          {...{ variant_inspection, token, isEdit, id, vehicle_inspection }}
        />
      )}
    </div>
  );
};

export default AddEditVehicle;

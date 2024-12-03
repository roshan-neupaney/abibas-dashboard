"use client";
import { useState } from "react";
import General from "../../../../../components/addCar/general";
import ColorVariationImages from "../../../../../components/addCar/images";
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
          // ) : active === 2 ? (
          //   <AddSpecifications
          //     {...{
          //       variant_specification,
          //       token,
          //       isEdit,
          //       id,
          //       vehicle_specification,
          //     }}
          //   />
          // ) : active === 3 ? (
          //   <AddFeatures
          //     {...{ variant_feature, token, isEdit, id, vehicle_features }}
          //   />
          // ) : active === 4 ? (
          //   <AddInspections
          //     {...{ variant_inspection, token, isEdit, id, vehicle_inspection }}
          //   />
          // ) : active === 5 ? (
          //   <Vehicle360Images {...{ isEdit, token, id, vehicle_ext_360_images }} />
          // ) : active === 6 ? (
          //   <VehicleInt360Images
          //     {...{ isEdit, token, id, vehicle_int_360_images }}
          //   />
          // ) : (
          //   <VehicleDamagedImages
          //     {...{ isEdit, token, id, vehicle_int_360_images, vehicle_body_part, vehicle_scratch }}
          //   />
        )
      )}
    </div>
  );
};

export default AddEditVehicle;

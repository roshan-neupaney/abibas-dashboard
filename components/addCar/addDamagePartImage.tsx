import React, { useState } from "react";
import SVGAdd from "./svgAdd";
import DamageImageModal from "./modal/damageImageModal";

interface VehicleDamagedImagesProps {
  token: string;
  id: string;
  vehicle_body_part: any;
  vehicle_scratch: any;
}

const VehicleDamagedImages = ({
  token,
  id,
  vehicle_body_part,
  vehicle_scratch,
}: VehicleDamagedImagesProps) => {
  const defaultState = {
    id: "",
    state: false,
    vehicle_id: id,
    file: "",
    value: "",
    status: "ACTIVE",
  };

  const [openModal, toggleModal] = useState(defaultState);

  const beautifiedBodyParts = vehicle_body_part?.data?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });

  return (
    <>
      <div className="flex p-4 flex-col gap-4">
        <SVGAdd
          vehicleScratch={vehicle_scratch.data}
          {...{ toggleModal, beautifiedBodyParts }}
        />
      </div>
      <DamageImageModal
        open={openModal.state}
        handleClose={() => toggleModal(defaultState)}
        token={token}
        openModal={openModal}
        vehicleScratch={vehicle_scratch.data}
      />
    </>
  );
};

export default VehicleDamagedImages;

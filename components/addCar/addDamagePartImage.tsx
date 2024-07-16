import React, { useState } from "react";
import SVGAdd from "./svgAdd";
import DamageImageModal from "./modal/damageImageModal";
import { DeleteWithId, ServerSideGetWithId } from "../../utilities/apiCall";
import { DELETE_SCRATCH, GET_SCRATCH } from "../../config/endPoints";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SERVER_SIDE_GET } from "../../config/method";

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
  const router = useRouter()
  const [scratchData, setScratchData] = useState(vehicle_scratch?.data);
  const [openModal, toggleModal] = useState(defaultState);

  const beautifiedBodyParts = vehicle_body_part?.data?.map((items: any) => {
    return { id: items?.id, label: items?.title };
  });


  const handleDelete = async (image_id:string) => {
    try {
      const res = await DeleteWithId(DELETE_SCRATCH, image_id, token);
      const { status }: any = res;
      if (status) {
        toast.success("Image successfully deleted");
        toggleModal(defaultState);
        // getData();
        router.refresh();
      } else {
        toast.error("Error while deleting Image");
      }
    } catch (e) {
      toast.error("Error while deleting Image");
    }
  };

  const getData = async() => {
    try{
      const res = await ServerSideGetWithId(token, GET_SCRATCH, id);
      setScratchData(res?.data);
    } catch(e) {
      console.error(e)
    }
  }

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
        handleDelete={handleDelete}
        vehicleScratch={vehicle_scratch.data}
      />
    </>
  );
};

export default VehicleDamagedImages;

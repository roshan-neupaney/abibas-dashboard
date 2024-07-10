import Image from "next/image";
import crossIcon from "../../../public/icons/cross.svg";
import ImageUploadCard from "@/subComponents/imageUploadCard";
import { FormdataPatch, FormdataPost } from "../../../utilities/apiCall";
import { POST_SCRATCH, UPDATE_SCRATCH } from "../../../config/endPoints";
import clearCachesByServerAction from "../../../hooks/revalidate";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

interface DamageImageModal {
  open: boolean;
  handleClose: any;
  openModal?: any;
  token: string;
  vehicleScratch: any;
}

const DamageImageModal = ({
  open,
  handleClose,
  token,
  openModal,
  vehicleScratch,
}: DamageImageModal) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  useEffect(() => {
    vehicleScratch.forEach((items: any) => {
      if (openModal?.value === items?.assetsPart?.id) {
        setImage(items?.image_name);
      }
    });
  }, [openModal.state]);

  const beautifyPayload = (data: any, val: any) => {
    const detail = {
      file: "",
      vehicle_id: "",
      value: "",
      status: "ACTIVE",
    };
    detail.file = val;
    detail.vehicle_id = data.vehicle_id;
    detail.value = data.value;
    return detail;
  };
  
  const handleAdd = async (val: any) => {
    try {
      setLoading(true);
      const beautifiedPayload = beautifyPayload(openModal, val);
      const response = await FormdataPost(
        POST_SCRATCH,
        beautifiedPayload,
        token
      );
      const { status }: any = response;
      if (status) {
        toast.success("Successfully Added Vehicle Interior Images");
        clearCachesByServerAction("/admin/inventory");
      } else {
        toast.error("Error While Adding Vehicle Interior Images");
      }
    } catch (e) {
      toast.error("Error While Adding");
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (val: any) => {
    try {
      setLoading(true);
      const beautifiedPayload = beautifyPayload(openModal, val);
      const response = await FormdataPatch(
        UPDATE_SCRATCH,
        openModal?.id,
        beautifiedPayload,
        token
      );
      const { status }: any = response;
      if (status) {
        toast.success("Successfully Added Vehicle Interior Images");
        clearCachesByServerAction("/admin/inventory");
      } else {
        toast.error("Error While Adding Vehicle Interior Images");
      }
    } catch (e) {
      toast.error("Error While Adding");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {open && (
        <div className="flex fixed top-0 left-0 w-full h-full justify-center items-center gap-2 bg-[#c7c7c7a3] z-50">
          <div className="flex min-w-[30rem] flex-col items-center rounded-lg bg-[#f9f7f7] shadow-2xl">
            <div className="flex py-3 px-5 gap-4 items-center self-stretch border-b border-solid border-[#D8DADB]">
              <div className="flex flex-1 headline-small-NH">Add Image</div>
              <span
                className="flex p-[0.625rem] justify-center items-center cursor-pointer"
                onClick={() => {
                  handleClose();
                  setImage('')
                }}
              >
                <Image src={crossIcon} height={20} width={20} alt="" />
              </span>
            </div>
            <div className="flex w-80 h-60 border relative m-4">
              {loading && (
                <div className="flex w-full h-full absolute bg-[#c7c7c7a3] justify-center items-center z-10">
                  <div className="border-4 border-solid border-[#202529] border-b-transparent w-14 h-14 rounded-full animate-spin"></div>
                </div>
              )}
              <ImageUploadCard
                value={image}
                onChange={(val: any) => openModal.id ? handleUpdate(val) :  handleAdd(val)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DamageImageModal;

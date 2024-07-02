import ImageUploadCard from "@/subComponents/imageUploadCard";
import AddIcon from "../../public/icons/add.svg";
import RemoveIcon from "../../public/icons/cross.svg";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UUidGenerator } from "../../utilities/helper";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import {
  FormdataPatch,
  FormdataPost,
  VechicleImagesPatch,
} from "../../utilities/apiCall";
import { CRUD_VEHICLE } from "../../config/endPoints";
import { useRouter } from "next/navigation";
import clearCachesByServerAction from "../../hooks/revalidate";
import CustomSelect from "@/subComponents/select";

interface VehicleDamagedImagesProps {
  isEdit: boolean;
  token: string;
  id: string;
  vehicle_int_360_images: any;
}

const VehicleDamagedImages = ({
  isEdit,
  token,
  id,
  vehicle_int_360_images,
}: VehicleDamagedImagesProps) => {
  const [imageCards, setImageCards] = useState([{ id: "", image: "" }]);
  const isEditable = vehicle_int_360_images?.data?.length > 0;
  const beautifiedImageList = vehicle_int_360_images?.data?.map(
    (items: any) => {
      return { id: items.id, image: items.image_name };
    }
  );
  console.log("vehicle_int_360_images", vehicle_int_360_images);
  const [deletedImages, setDeletedImages] = useState<any>([]);

  useEffect(() => {
    setImageCards(beautifiedImageList);
  }, []);
  const [loading, setLoading] = useState(false);
  const uuid = UUidGenerator();
  const router = useRouter();

  const addCard = () => {
    setImageCards((prev: any) => {
      return [...prev, { id: "uuid_" + uuid, image: "" }];
    });
  };

  const removeCard = (id: string) => {
    if (!id.includes("uuid")) {
      setDeletedImages((prev: any) => {
        return [...prev, { image_id: id }];
      });
    }
    const filteredCard = imageCards.filter((item: any) => {
      if (item.id !== id) {
        return item;
      }
    });
    setImageCards(filteredCard);
  };

  const updateImageCard = (id: string, val: any, key: string) => {
    const filteredData = imageCards.filter((items: any) => {
      if (items.id === id) {
        items[key] = val;
      }
      return items;
    });
    setImageCards(filteredData);
  };
  console.log("image", imageCards);
  const handleAdd = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      imageCards?.map((items: any) => {
        formData.append("file", items.image);
      });

      const response = await FormdataPost(
        CRUD_VEHICLE + "/" + id + "/images360/INT",
        formData,
        token
      );
      const { status }: any = response;
      if (status) {
        toast.success("Successfully Added Vehicle Interior Images");
        clearCachesByServerAction("/admin/inventory");
        router.push("/admin/inventory");
      } else {
        toast.error("Error While Adding Vehicle Interior Images");
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error While Adding");
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      imageCards?.map((items: any) => {
        if (!(typeof items.image === "string"))
          formData.append("file", items.image);
      });
      formData.append("deleteImages", JSON.stringify(deletedImages));
      const response = await VechicleImagesPatch(
        CRUD_VEHICLE + "/" + id + "/images360/INT",
        formData,
        token
      );
      const { status }: any = response;
      if (status) {
        toast.success("Successfully Updated Vehicle Interior Images");
        clearCachesByServerAction("/admin/inventory");
        router.push("/admin/inventory");
      } else {
        toast.error("Error While Updating Vehicle Interior Images");
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error While Updating");
      setLoading(false);
    }
  };

  return (
    <div className="flex p-4 flex-col gap-4">
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10">
        {imageCards?.map((cards: any, index: number) => {
          return (
            <div className="flex flex-col">
              <div key={index} className="flex relative rounded-lg">
                <ImageUploadCard
                  value={cards.image}
                  onChange={(val: any) =>
                    updateImageCard(cards.id, val, "image")
                  }
                />
                <span
                  className="absolute bg-[#FCFCFC] border"
                  onClick={() => removeCard(cards.id)}
                >
                  <Image src={RemoveIcon} width={25} height={25} alt="" />
                </span>
              </div>
              <CustomSelect
                title=""
                value={""}
                onChange={() => {}}
                data={[]}
                placeholder="Select Damaged Body Part"
              />
            </div>
          );
        })}
        <div
          onClick={addCard}
          className="cursor-pointer flex items-center justify-center h-[15rem] border-2 border-dashed rounded-lg"
        >
          <span>
            <Image src={AddIcon} width={40} height={40} alt="" />
          </span>
        </div>
      </div>
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        disabled={loading}
        onClick={isEditable ? handleUpdate : handleAdd}
      />
    </div>
  );
};

export default VehicleDamagedImages;

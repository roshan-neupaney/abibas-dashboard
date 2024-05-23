import ImageUploadCard from "@/subComponents/imageUploadCard";
import AddIcon from "../../public/icons/add.svg";
import RemoveIcon from "../../public/icons/cross.svg";
import React, { useState } from "react";
import Image from "next/image";
import { UUidGenerator } from "../../utilities/helper";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import { FormdataPost } from "../../utilities/apiCall";
import { CRUD_VEHICLE } from "../../config/endPoints";
import { useRouter } from "next/navigation";
import clearCachesByServerAction from "../../hooks/revalidate";

interface VehicleImagesProps {
  isEdit: boolean;
  token: string;
  id: string;
}

const VehicleImages = ({ isEdit, token, id }: VehicleImagesProps) => {
  const [imageCards, setImageCards] = useState([{ id: "", image: "" }]);
  const [loading, setLoading] = useState(false);
  const uuid = UUidGenerator();
  const router = useRouter();

  const addCard = () => {
    setImageCards((prev: any) => {
      return [...prev, { id: "#" + uuid, image: "" }];
    });
  };

  const removeCard = (id: string) => {
    const filteredCard = imageCards.filter((item: any) => {
      if (item.id !== id) {
        return item;
      }
    });

    setImageCards(filteredCard);
  };

  const updateImageCard = (key: string, val: any, i: number) => {
    imageCards[i].image = val;
  };
  const handleAdd = async () => {
    //   setLoading(true);
    try {
        const formData = new FormData()
      const file = imageCards?.map((items: any) => {
        formData.append('file',items.image)
      });

      const response = await FormdataPost(
        CRUD_VEHICLE + "/" + id + "/images",
        formData,
        token
      );
      const { status }: any = response;
        if (status) {
          toast.success("Successfully Updated Vehicle Details");
          clearCachesByServerAction("/admin/inventory");
          router.push("/admin/inventory");
        } else {
          toast.error("Error While Updating Vehicle Details");
          setLoading(false);
        }
    } catch (e) {
      toast.error("Error While Updating");
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="flex p-4 flex-col gap-4">
      <div className="flex flex-1 items-center gap-4 flex-wrap">
        {imageCards.map((cards: any, index: number) => {
          return (
            <div key={index} className="flex relative">
              <ImageUploadCard
                value={""}
                onChange={(val: any) => updateImageCard("image", val, index)}
              />
              <span
                className="absolute bg-[#FCFCFC] border"
                onClick={() => removeCard(cards.id)}
              >
                <Image src={RemoveIcon} width={30} height={30} alt="" />
              </span>
            </div>
          );
        })}
        <div
          onClick={addCard}
          className="cursor-pointer flex items-center justify-center h-[15rem] w-[19rem] border-2 border-dashed"
        >
          <span>
            <Image src={AddIcon} width={40} height={40} alt="" />
          </span>
        </div>
      </div>
      <SubmitButton
        title={isEdit ? "Edit" : "Add"}
        disabled={loading}
        onClick={isEdit ? handleAdd : handleAdd}
      />
    </div>
  );
};

export default VehicleImages;

import ImageUploadCard from "@/subComponents/imageUploadCard";
import AddIcon from "../../public/icons/add.svg";
import RemoveIcon from "../../public/icons/cross.svg";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UUidGenerator } from "../../utilities/helper";
import { SubmitButton } from "@/subComponents/buttons";
import toast from "react-hot-toast";
import {
  DeleteWithId,
  FormdataPatch,
  FormdataPost,
  VechicleImagesPatch,
} from "../../utilities/apiCall";
import { COLOR_VARIATION_IMAGES, CRUD_VEHICLE } from "../../config/endPoints";
import { useRouter } from "next/navigation";
import clearCachesByServerAction from "../../hooks/revalidate";
import CustomSelect from "@/subComponents/select";

interface ColorVariationImagesProps {
  isEdit: boolean;
  token: string;
  _id: string;
  color_variation: any;
}

const ColorVariationImages = ({
  isEdit,
  token,
  _id,
  color_variation,
}: ColorVariationImagesProps) => {
  const [imageCards, setImageCards] = useState<Array<Record<string, string>>>([
    { id: "uuid_", image: "" },
  ]);
  const [selectedColorVariation, setSelectedColorVariation] = useState("");
  const [isEditable, toggleIsEditable] = useState(false);
  
  const beautifiedColorVariation = color_variation?.map((items: any) => {
    return { id: items.id, label: items.color.join(" / ") };
  });
  console.log("color_variation", color_variation);
  useEffect(() => {
    color_variation?.filter((items: any) => {
      if (selectedColorVariation === items?.id) {
        toggleIsEditable(items?.colorVariationImages?.length > 0);
        let tempImages: Array<Record<string, any>> = [];
        items?.colorVariationImages?.map((img: any) => {
          tempImages.push({ id: img.id, image: img.image_url });
        });
        setImageCards(tempImages);
      }
    });
  }, [selectedColorVariation, color_variation]);

  const [loading, setLoading] = useState(false);
  const uuid = UUidGenerator();
  const router = useRouter();

  const addCard = () => {
    setImageCards((prev: any) => {
      return [...prev, { id: "uuid_" + uuid, image: "" }];
    });
  };

  const removeCard = async(id: string) => {
    try {
      if(id.includes('uuid_')){
        const filteredData = imageCards.filter((items: any) => {
          if(id !== items.id) return items
        })
        setImageCards(filteredData)
      } else {
        const res = await DeleteWithId(COLOR_VARIATION_IMAGES, id, token);
        const { status }: any = res;
        if (status) {
          router.refresh();
          toast.success("Image successfully deleted");
        } else {
          toast.error("Error while deleting Image");
        }

      }
    } catch (e) {
      toast.error("Error while deleting Image");
    }
  };
  const updateImageCard = (id: string, val: any, key: string) => {
    const filteredData = imageCards?.filter((items: any) => {
      if (items.id === id) {
        items[key] = val;
      }
      return items;
    });
    setImageCards(filteredData);
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const formData = imageCards.map((items) => {
        return {
          file: items?.image,
          color_variation_id: selectedColorVariation,
        };
      });
      const response = await FormdataPost(
        COLOR_VARIATION_IMAGES,
        { variation: formData },
        token
      );
      const { status }: any = response;
      if (status) {
        toast.success("Successfully Updated Vehicle Details");
        clearCachesByServerAction("/admin/inventory");
        router.refresh();
        setLoading(false);
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
    setLoading(true);
    try {
      const formData = imageCards.map((items) => {
        return {
          id: items.id.includes("uuid") ? undefined : items?.id,
          file: items?.image,
          color_variation_id: selectedColorVariation,
        };
      });
      const response = await FormdataPatch(
        COLOR_VARIATION_IMAGES,
        "",
        { variation: formData },
        token
      );
      const { status }: any = response;
      if (status) {
        toast.success("Successfully Updated Vehicle Details");
        clearCachesByServerAction("/admin/inventory");
        router.refresh();
        setLoading(false);
      } else {
        toast.error("Error While Updating Vehicle Details");
        setLoading(false);
      }
    } catch (e) {
      toast.error("Error While Updating");
      setLoading(false);
    }
  };

  return (
    <div className="flex p-4 flex-col gap-4">
      <div className="w-[30rem]">
        <CustomSelect
          title="Color Variations"
          value={selectedColorVariation}
          data={beautifiedColorVariation}
          onChange={(val: string) => setSelectedColorVariation(val)}
          placeholder="Select a color variation"
        />
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10">
        {imageCards?.map((cards: any, index: number) => {
          return (
            <div key={index} className="flex relative rounded-lg">
              <ImageUploadCard
                value={cards.image}
                onChange={(val: any) => updateImageCard(cards.id, val, "image")}
              />
              <span
                className="absolute bg-[#FCFCFC] border"
                onClick={() => removeCard(cards.id)}
              >
                <Image src={RemoveIcon} width={25} height={25} alt="" />
              </span>
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
        title={isEditable ? "Edit" : "Add"}
        disabled={loading}
        onClick={isEditable ? handleUpdate : handleAdd}
      />
    </div>
  );
};

export default ColorVariationImages;

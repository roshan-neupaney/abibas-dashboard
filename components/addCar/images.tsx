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
    { id: "", image: "" },
  ]);
  const [selectedColorVariation, setSelectedColorVariation] = useState("");
  const [isEditable, toggleIsEditable] = useState(false);

  const [deletedImages, setDeletedImages] = useState<any>([]);

  const beautifiedColorVariation = color_variation.map((items: any) => {
    return { id: items.id, label: items.color.join(" / ") };
  });

  useEffect(() => {
    color_variation?.filter((items: any) => {
      if (selectedColorVariation === items?.id) {
        toggleIsEditable(items?.images?.length > 0);
        let tempImages: Array<Record<string, string>> = [];
        items?.images?.map((img: string) => {
          tempImages.push({ id: img, image: img });
        });
        setImageCards(tempImages);
      }
    });
  }, [selectedColorVariation]);

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
    const filteredCard = imageCards?.filter((item: any) => {
      if (item.id !== id) {
        return item;
      }
    });
    setImageCards(filteredCard);
  };
  console.log("imageCards", imageCards);
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
      const formData = { file: imageCards.map((items) => items.image) };
      console.log(formData);
      const response = await FormdataPost(
        COLOR_VARIATION_IMAGES + "/" + selectedColorVariation,
        formData,
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
      const formData = new FormData();
      imageCards?.map((items: any) => {
        if (!(typeof items.image === "string"))
          formData.append("file", items.image);
      });
      formData.append("deleteImages", JSON.stringify(deletedImages));
      const response = await VechicleImagesPatch(
        CRUD_VEHICLE + "/" + _id + "/images",
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
        onClick={handleAdd}
      />
    </div>
  );
};

export default ColorVariationImages;

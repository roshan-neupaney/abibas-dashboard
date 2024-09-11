import CustomInput from "@/subComponents/input";
import React, { useEffect, useState } from "react";
import addIcon from "../../public/icons/add-light.svg";
import Image from "next/image";
import { updateState, UUidGenerator } from "../../utilities/helper";
import ImageUploadCard from "@/subComponents/imageUploadCard";
import AddSizeVariation from "./addSizeVariation";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import { CustomMultiSelect } from "@/subComponents/select";

const AddShoeVariation = ({
  isEdit,
  color_variation,
  setFormData,
  formError,
  beautifiedColor,
  setDeleteColorVariation,
  setDeleteSizeVariation,
}: any) => {
  const [colorVariation, setColorVariation] = useState(color_variation);

  useEffect(() => {
    setColorVariation(color_variation);
  }, [color_variation]);

  useEffect(() => {
    updateState("color_variation", colorVariation, setFormData);
  }, [colorVariation]);

  const handleAdd = () => {
    let uuid = UUidGenerator();
    setColorVariation((prev: any) => {
      return [
        ...prev,
        {
          id: "uuid_" + uuid,
          color: [],
          file: "",
          sizes: [
            {
              id: "uuid_" + uuid,
              size: "",
              stock: "",
            },
          ],
        },
      ];
    });
  };

  const updateForm = (id: string, key: string, value: any) => {
    const result = colorVariation.map((items: any) => {
      if (items.id === id) {
        items[key] = value;
      }
      return items;
    });
    setColorVariation(result);
  };

  const handleDelete = (id: string) => {
    if (!id.includes("uuid_")) {
      setDeleteColorVariation((prev: any) => {
        return [...prev, id ];
      });
    }
    const remainingColorVariation = colorVariation?.filter((items: any) => {
      if (items?.id !== id) {
        return items;
      }
    });
    setColorVariation(remainingColorVariation);
  };
  
  return (
    <div className="flex flex-1 flex-col gap-4">
      {colorVariation?.map((items: any, index: number) => {
        return (
          <div className="flex gap-8 border rounded-xl p-4" key={index}>
            <div className="flex flex-col relative w-[17rem] gap-2">
              <ImageUploadCard
                value={items.image_url}
                onChange={(val: string) => updateForm(items.id, "file", val)}
              />
              <CustomMultiSelect
                title="Color"
                data={beautifiedColor}
                value={items.color}
                onChange={(val: any) => updateForm(items.id, "color", val)}
                placeholder="Enter Color"
                error={formError[index]?.color}
              />
            </div>
            <AddSizeVariation
              {...{ colorVariation, setColorVariation, isEdit, setDeleteSizeVariation }}
              colorVariationId={items?.id}
              size_variation={items?.sizes}
              sizeError={formError[index]?.sizes}
            />
            <span
              onClick={() => handleDelete(items?.id)}
              className="flex cursor-pointer"
            >
              <Image src={deleteIcon} width={20} height={20} alt="" />
            </span>
          </div>
        );
      })}
      <span
        onClick={handleAdd}
        className="w-fit flex cursor-pointer border rounded-2xl py-2 px-4 gap-2 bg-slate-700"
      >
        <Image src={addIcon} width={20} height={20} alt="" />
        <span className="label-submit" style={{ color: "#fcfcfc" }}>
          Add Color Variation
        </span>
      </span>
    </div>
  );
};

export default AddShoeVariation;

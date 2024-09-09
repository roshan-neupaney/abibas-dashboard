import React, { useEffect, useState } from "react";
import { UUidGenerator } from "../../utilities/helper";
import Image from "next/image";
import addIcon from "../../public/icons/add.svg";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import CustomInput from "@/subComponents/input";

const AddSizeVariation = ({
  colorVariation,
  setColorVariation,
  colorVariationId,
  size_variation,
  sizeError,
  isEdit,
}: any) => {
  const uuid = UUidGenerator();
  const defaultSizeForm = {
    id: "uuid_" + uuid,
    size: "",
    stock: "",
  };

  const [sizeVariation, setSizeVariation] = useState(size_variation);
  // console.log('size_variation', size_variation)
  useEffect(() => {
    setSizeVariation(size_variation);
  }, [size_variation]);

  const handleAdd = () => {
    setSizeVariation((prev: any) => {
      const result = [...prev, defaultSizeForm];
      colorVariation?.map((cv: any) => {
        if (cv.id === colorVariationId) {
          cv["sizes"] = result;
        }
        return cv;
      });
      return result;
    });
  };

  const handleDelete = (id: string) => {
    const remainingSize = sizeVariation?.filter((items: any) => {
      if (items.id !== id) {
        return items;
      }
    });
    setSizeVariation(remainingSize);
    const updatedResult = colorVariation?.map((cv: any) => {
      if (cv.id === colorVariationId) {
        cv["sizes"] = remainingSize;
      }
      return cv;
    });
    setColorVariation(updatedResult);
  };

  const updateForm = (id: string, key: string, value: string) => {
    const result = sizeVariation?.map((items: any) => {
      if (items.id === id) {
        items[key] = value;
      }
      return items;
    });
    setSizeVariation(result);
    const updatedResult = colorVariation?.map((cv: any) => {
      if (cv.id === colorVariationId) {
        cv["sizes"] = result;
      }
      return cv;
    });
    setColorVariation(updatedResult);
  };
  console.log('sizeError',sizeError)

  return (
    <div className="">
      <div className="grid grid-cols-6 gap-6">
        {sizeVariation?.map((size: any, index: number) => {
          return (
            <div
              className="flex gap-2 border-2 rounded-2xl items-center p-2"
              key={index}
            >
              <CustomInput
                title="Size"
                value={size?.size}
                onChange={(val: string) => updateForm(size.id, "size", val)}
                placeholder="Size"
                type="number"
                width="4rem"
                // error={sizeError[index]?.size}
              />
              <CustomInput
                title="Stock"
                value={size?.stock}
                onChange={(val: string) => updateForm(size.id, "stock", val)}
                placeholder="Stock"
                type="number"
                width="4rem"
                // error={sizeError[index]?.stock}
              />
              <span
                className="mt-5 cursor-pointer "
                onClick={() => handleDelete(size.id)}
              >
                <Image src={deleteIcon} width={20} height={20} alt="" />
              </span>
            </div>
          );
        })}
        <span onClick={handleAdd} className="flex cursor-pointer">
          <Image src={addIcon} width={20} height={20} alt="" />
        </span>
      </div>
    </div>
  );
};

export default AddSizeVariation;

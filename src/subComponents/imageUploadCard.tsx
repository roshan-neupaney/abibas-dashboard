import React, { useEffect, useState } from "react";
import addPhotoIcon from "../../public/images/placeHolder.png";
import Image from "next/image";
import { IMAGE_URL } from "../../config/constants";
import LazyImage from "../../components/lazyImage";

interface ImageUploadCardProps {
  onChange: any;
  value: any;
  id: string;
}

const ImageUploadCard = ({
  value,
  id,
  onChange
}: ImageUploadCardProps) => {
  const imgUrl = IMAGE_URL + '/' + value;
  const [tempImage, setTempImage] = useState<any>(imgUrl);

  useEffect(() => {
    if (typeof value === "object") {
      const file = value;
      if (file) {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            setTempImage(reader.result);
          },
          false
        );
        reader?.readAsDataURL(file);
      }
    } else {
      setTempImage(imgUrl);
    }
  }, [value]);

  const onDrop = (e: any) => {
    const file = e.files[0];
    if (file) {
    //   const originalFileName = file.name;
    // const extension = originalFileName.split('.').pop();
    // const baseName = originalFileName.substring(0, originalFileName.lastIndexOf('.'));
    // const suffix = baseName.substring(baseName.lastIndexOf('-'));
    //   const newFile = new File([file], `${suffix}.${extension}`, { type: file.type });
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          setTempImage(reader.result);
        },
        false
      );
      reader?.readAsDataURL(file);
    onChange(file);
    }
  };

  return (
    <label className="cursor-pointer">
      <div className="border-2 border-dashed flex h-60 items-center justify-center">
        <input
          className="opacity-0 w-0 h-0"
          type="file"
          onChange={(e) => onDrop(e.target)}
          accept="image/*"
        />
        <span className="flex flex-1">
          <LazyImage
            src={tempImage}
            fill={true}
            alt=""
            className='rounded-lg'
          />
        </span>
      </div>
    </label>
  );
};

export default ImageUploadCard;

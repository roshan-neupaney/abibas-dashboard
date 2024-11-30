import React, { useEffect, useState } from "react";
import { IMAGE_URL } from "../../config/constants";
import LazyImage from "../../components/lazyImage";

interface ImageUploadCardProps {
  onChange: any;
  value: any;
}

const ImageUploadCard = ({
  value,
  onChange
}: ImageUploadCardProps) => {
  const imgUrl = IMAGE_URL + '/' + value;
  const [tempImage, setTempImage] = useState<any>(imgUrl);
console.log(imgUrl)
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
    <label className="cursor-pointer border-2 w-full">
      <div className="flex h-60 items-center justify-center">
        <input
          className="opacity-0 w-0 h-0"
          type="file"
          onChange={(e) => onDrop(e.target)}
          accept="image/*"
        />
        <span className="flex flex-1 relative h-full">
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

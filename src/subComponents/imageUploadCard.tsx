import React, { useEffect, useState } from "react";
import addPhotoIcon from "../../public/images/placeHolder.png";
import Image from "next/image";
import { IMAGE_URL } from "../../config/constants";
import LazyImage from "../../components/lazyImage";

interface ImageUploadCardProps {
  onChange: any;
  value: any;
}

const ImageUploadCard = ({ value, onChange }: ImageUploadCardProps) => {
  const imgUrl = IMAGE_URL + "small-" + value;
  const [tempImage, setTempImage] = useState<any>();

  useEffect(() => {
    setTempImage(imgUrl);
  }, [imgUrl]);

  const onDrop = (e: any) => {
    const file = e.target.files[0];
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
    onChange(file);
  };

  // const handleError = () => {
  //   setTempImage(addPhotoIcon);
  // };
  return (
    <label className="cursor-pointer">
      <div className="border-2 border-dashed flex w-[19rem] h-60 items-center justify-center">
        <input
          className="opacity-0 w-0 h-0"
          type="file"
          onChange={(e) => onDrop(e)}
          accept="image/*"
        />
          <span className="flex flex-1">
            <LazyImage
              src={tempImage}
              fill={true}
              alt=""
              // onError={handleError}
            />
          </span>
        {/* {tempImage ? (
        ) : (
          <span>
            <Image src={addPhotoIcon} height={50} width={50} alt="" />
          </span>
        )} */}
      </div>
    </label>
  );
};

export default ImageUploadCard;

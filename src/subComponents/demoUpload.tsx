import React, { useEffect, useRef, useState } from "react";
import addPhotoIcon from "../../public/images/placeHolder.png";
import Image from "next/image";
import { IMAGE_URL } from "../../config/constants";
import LazyImage from "../../components/lazyImage";
import { UUidGenerator } from "../../utilities/helper";

interface DemoUploadCardProps {
  onChange: any;
  value: any;
  id: string;
  setImageCard: any;
  addCard: any;
}

const DemoUploadCard = ({
  value,
  id,
  onChange,
  setImageCard,
  addCard,
}: DemoUploadCardProps) => {
  const imgUrl = IMAGE_URL + "/" + value;
  const [tempImage, setTempImage] = useState<any>(imgUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const onUpload = (e: any) => {
    // const file = e.files[0];
    const fileArray = Array.from(e.files);
    fileArray.map((items: any) => {
      if (items) {
        addCard();
        const uuid = UUidGenerator();
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
        reader?.readAsDataURL(items);
        onChange(items);
      }
    });
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    if (fileInputRef?.current) {
      fileInputRef.current.files = e.dataTransfer.files;
      //   onUpload(fileInputRef.current);
      const fileArray = Array.from(fileInputRef.current.files || []);
      fileArray.map((items: any) => {
        if (items) {
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            () => {
              setTempImage(reader.result);
            },
            false
          );
          reader?.readAsDataURL(items);
        }
      });
    }
  };

  return (
    <label
      className="cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e)}
    >
      <div className="border-2 border-dashed flex h-60 items-center justify-center">
        <input
          className="opacity-0 w-0 h-0"
          type="file"
          onChange={(e) => onUpload(e.target)}
          accept="image/*"
          ref={fileInputRef}
        />
        <span className="flex flex-1">
          <LazyImage
            src={tempImage}
            fill={true}
            alt=""
            className="rounded-lg"
          />
        </span>
      </div>
    </label>
  );
};

export default DemoUploadCard;

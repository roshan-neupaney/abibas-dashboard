import Image from "next/image";
import addImage from "../public/icons/photo-add.svg";
import { useState } from "react";

interface CustomDropzoneProps {
  title: string;
  onChange: any;
  value: any;
}

const CustomDropzone = ({ title, onChange }: CustomDropzoneProps) => {
  const [tempImage, setTempImage] = useState(addImage);

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
  return (
    <div>
    <label className="title-medium">{title}</label>
    <label className="dropzone">
      <input type="file" onChange={(e) => onDrop(e)} accept="image/*" />
      <div className="dropzone-image-box">
        <Image
          className="dropzone-image"
          src={tempImage}
          alt="image"
          width={0}
          height={0}
        />
      </div>
      <p className="flex text-center text-sm text-[#201A1B]">
        Drag and Drop or Click to browse your device
      </p>
      <p className="flex text-center text-sm text-[#76777A] ">
        Accepted formats are .jpg, .gif, .bmp & .png. Maximum size allowed is 20
        MB. Minimum dimension allowed 600*400 Pixel
      </p>
    </label>
    </div>
  );
};

export default CustomDropzone;

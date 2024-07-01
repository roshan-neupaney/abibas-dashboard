import Image from "next/image";
import addImage from "../../public/icons/photo-add.svg";
import { useEffect, useRef, useState } from "react";
import { IMAGE_URL } from "../../config/constants";

interface CustomDropzoneProps {
  title: string;
  onChange: any;
  value: any;
  error?: string;
  required?: boolean;
}

const CustomDropzone = ({
  title,
  onChange,
  value,
  error = "",
  required = false,
}: CustomDropzoneProps) => {
  const imgUrl = IMAGE_URL + "/small-" + value;
  const [tempImage, setTempImage] = useState(addImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempImage(imgUrl);
  }, [imgUrl]);

  const onUpload = (e: any) => {
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
    }
    onChange(file);
  };

  const handleError = () => {
    setTempImage(addImage);
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    if (fileInputRef?.current) {
      fileInputRef.current.files = e.dataTransfer.files;
      onUpload(fileInputRef.current);
    }
  };

  return (
    <div>
      <label className="label" style={{ color: error ? "red" : "#1a1c1e" }}>
        {title}
        {required ? "*" : ""}
      </label>
      <label
        className="dropzone"
        style={{ border: error ? "1px dashed red" : "" }}
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          onChange={(e) => onUpload(e.target)}
          accept="image/*"
          ref={fileInputRef}
        />
        <div className="p-1">
          <Image
            className="rounded"
            src={tempImage}
            alt="image"
            width={80}
            height={80}
            onError={handleError}
          />
        </div>
        <p className="flex text-center text-sm text-[#201A1B]">
          Drag and Drop or Click to browse your device
        </p>
        <p className="flex text-center text-sm text-[#76777A] ">
          Accepted formats are .jpg, .gif, .bmp & .png. Maximum size allowed is
          20 MB. Minimum dimension allowed 600*400 Pixel
        </p>
      </label>
      <div className="error-label h-1">{error}</div>
    </div>
  );
};

export default CustomDropzone;
